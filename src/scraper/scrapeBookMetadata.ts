import type { Root } from 'cheerio';

import { currentAmazonRegion } from '~/amazonRegion';
import type { Book, BookMetadata } from '~/models';

import { loadRemoteDom } from './loadRemoteDom';

type PopoverData = {
  inlineContent: string;
};

const parseDetailsList = ($: Root): Omit<BookMetadata, 'authorUrl'> => {
  const detailsList = $('#detailBullets_feature_div .detail-bullet-list:first-child li span.a-list-item span.a-text-bold')
    .toArray()
    .reduce((accumulator, el) => {
      const key = $(el).text()
        .replace(/[\n\r]+/g, '')
        .replace(':', '')
        .replace(/[^\w\s-]/gi, '') // Strip all chars except alpha numeric, spaces, and hyphens
        .trim();
      const val = $(el).next()
        .text()
        .trim();
      accumulator.set(key, val);
      return accumulator;
    }, new Map<string, string>());

  const publicationDateStr = detailsList.get('Publication date');
  const publicationDate = publicationDateStr ? new Date(publicationDateStr).toLocaleDateString() : undefined;
  return {
    isbn: detailsList.get('ISBN-13'),
    pages: (/\d+/.exec(detailsList.get('Print length')))?.[0],
    publicationDate,
    publisher: detailsList.get('Publisher'),
  };
};

const parseIsbn = ($: Root): string | undefined => {
  // Attempt 1 - Try and fetch isbn from product information popover
  const popoverData = $(
    '#rich_product_information ol.a-carousel span[data-action=a-popover]'
  ).data('a-popover') as PopoverData;

  const isbnMatches = popoverData?.inlineContent.match(/(?<=\bISBN\s)(\w+)/g);

  if (isbnMatches) {
    return isbnMatches[0];
  }

  // Attempt 2 - Look for ISBN feature on page
  const isbnFeature = $('#printEditionIsbn_feature_div .a-row:first-child span:nth-child(2)')
    ?.text()
    .trim();

  return isbnFeature;
};

const parseAuthorUrl = ($: Root): string | undefined => {
  const region = currentAmazonRegion();
  const href = $('a.a-size-base.a-link-normal.a-text-normal').attr('href');
  return href ? `https://${region.hostname}/${href}` : undefined;
};

export const parseBookMetadata = ($: Root): BookMetadata => {
  const metadata = parseDetailsList($);

  return {
    ...metadata,
    ...(metadata.isbn === undefined ? { isbn: parseIsbn($) } : {}),
    authorUrl: parseAuthorUrl($),
  };
};

const scrapeBookMetadata = async (book: Book): Promise<BookMetadata> => {
  const region = currentAmazonRegion();
  const { dom } = await loadRemoteDom(`https://${region.hostname}/dp/${book.asin}`, 1000);

  return parseBookMetadata(dom);
};

export default scrapeBookMetadata;

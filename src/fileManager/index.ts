import { MetadataCache, normalizePath, Notice, TAbstractFile, TFile, TFolder, Vault } from 'obsidian';

import type { Book, KindleFile, KindleFrontmatter } from '~/models';
import { mergeFrontmatter } from '~/utils';

import { bookFilePath, bookToFrontMatter, frontMatterToBook } from './mappers';

const SyncingStateKey = 'kindle-sync';
const HighlightsBaseFileName = 'Kindle Notes and Highlights.base'
const BaseContent = `formulas:
  cover: note["kindle-sync"]["bookImageUrl"]
  title: note["kindle-sync"]["title"]
  author: note["kindle-sync"]["author"]
  asin: note["kindle-sync"]["asin"]
  lastAnnotatedDate: note["kindle-sync"]["lastAnnotatedDate"]
  highlightsCount: note["kindle-sync"]["highlightsCount"]
properties:
  formula.cover:
    displayName: cover
  formula.title:
    displayName: title
  formula.lastAnnotatedDate:
    displayName: last annotated
  formula.highlightsCount:
    displayName: highlights
views:
  - type: cards
    name: Table
    filters:
      and:
        - file.hasProperty("kindle-sync")
    order:
      - formula.title
      - formula.title
      - formula.author
      - formula.asin
      - formula.lastAnnotatedDate
      - formula.highlightsCount
    image: formula.cover
    cardSize: 150
    imageAspectRatio: 1.5
`
export default class FileManager {
  constructor(private vault: Vault, private metadataCache: MetadataCache) {}

  public async createBaseFile(basesFolder: string): Promise<void> {
    const filePath = normalizePath(`${basesFolder}/${HighlightsBaseFileName}`);
    try {
      await this.vault.create(filePath, BaseContent);
    } catch (error) {
      console.error(`Error writing new base file (path="${filePath})"`);
      throw error;
    }
  }

  public async readFile(file: KindleFile): Promise<string> {
    return await this.vault.cachedRead(file.file);
  }

  public getKindleFile(book: Book): KindleFile | undefined {
    const allSyncedFiles = this.getKindleFiles();

    const kindleFile = allSyncedFiles.find((file) => file.frontmatter.bookId === book.id);

    return kindleFile == null ? undefined : { ...kindleFile, book };
  }

  public mapToKindleFile(fileOrFolder: TAbstractFile): KindleFile | undefined {
    if (fileOrFolder instanceof TFolder) {
      return undefined;
    }

    const file = fileOrFolder as TFile;

    const fileCache = this.metadataCache.getFileCache(file);

    // File cache can be undefined if this file was just created and not yet cached by Obsidian
    const kindleFrontmatter = fileCache?.frontmatter?.[SyncingStateKey] as KindleFrontmatter;

    if (kindleFrontmatter == null) {
      return undefined;
    }

    const book = frontMatterToBook(kindleFrontmatter);

    return { file, frontmatter: kindleFrontmatter, book };
  }

  public getKindleFiles(): KindleFile[] {
    return this.vault
      .getMarkdownFiles()
      .map((file) => this.mapToKindleFile(file))
      .filter((file) => file != null);
  }

  public async createFile(
    book: Book,
    content: string,
    highlightsCount: number
  ): Promise<void> {
    const filePath = this.generateUniqueFilePath(book);
    const frontmatterContent = this.generateBookContent(book, content, highlightsCount);

    try {
      await this.vault.create(filePath, frontmatterContent);
    } catch (error) {
      console.error(`Error writing new file (path="${filePath})"`);
      throw error;
    }
  }

  public async updateFile(
    kindleFile: KindleFile,
    remoteBook: Book,
    content: string,
    highlightsCount: number
  ): Promise<void> {
    const frontmatterContent = this.generateBookContent(remoteBook, content, highlightsCount);

    try {
      await this.vault.modify(kindleFile.file, frontmatterContent);
    } catch (error) {
      console.error(`Error modifying e file (path="${kindleFile.file.path})"`);
      throw error;
    }
  }

  /**
   * Generate book content by combining both book (a) book markdown and
   * (b) rendered book highlights
   */
  private generateBookContent(book: Book, content: string, highlightsCount: number): string {
    return mergeFrontmatter(content, {
      [SyncingStateKey]: bookToFrontMatter(book, highlightsCount),
    });
  }

  private generateUniqueFilePath(book: Book): string {
    const filePath = bookFilePath(book);

    const isDuplicate = this.vault
      .getMarkdownFiles()
      .some((v) => v.path === normalizePath(filePath));

    if (isDuplicate) {
      const currentTime = new Date().getTime().toString();
      return filePath.replace('.md', `-${currentTime}.md`);
    }

    return filePath;
  }
}

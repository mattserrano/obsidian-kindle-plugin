import { FileManager, MetadataCache, normalizePath, TAbstractFile, TFile, TFolder, Vault } from 'obsidian';
import { get } from 'svelte/store';

import { type Book, type BookMetadata, BookNoteTag, type KindleFile, type KindleFrontmatter } from '~/models';
import { settingsStore } from '~/store';
import { mergeFrontmatter } from '~/utils';

import { bookFilePath, bookToFrontMatter, frontMatterToBook } from './mappers';

const SyncingStateKey = 'kindle-sync';
const HighlightsBaseFileName = 'Kindle Notes and Highlights.base'
const BaseContent = 
`
---
properties:
  title:
    displayName: title
  formula.highlightsCount:
    displayName: highlights
  note.highlightsCount:
    displayName: highlights
  note.lastAnnotatedDate:
    displayName: last annotated
  note.authorUrl:
    displayName: author url
  note.asin:
    displayName: ASIN
  note.isbn:
    displayName: ISBN
  note.bookImageUrl:
    displayName: book image url
views:
  - type: cards
    name: Books
    filters:
      and:
        - file.hasProperty("kindle-sync")
    order:
      - title
      - author
      - asin
      - lastAnnotatedDate
      - highlightsCount
    image: bookImageUrl
    cardSize: 150
    imageAspectRatio: 1.5
`

export default class KindleFileManager {
  constructor(private fileManager: FileManager, private vault: Vault, private metadataCache: MetadataCache) {}

  public async createBaseFile(baseFolder: string): Promise<void> {
    const filePath = normalizePath(`${baseFolder}/${HighlightsBaseFileName}`);
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
    metadata: BookMetadata,
    highlightsCount: number
  ): Promise<void> {
    const filePath = this.generateUniqueFilePath(book);
    const frontmatterContent = this.generateBookContent(book, content, highlightsCount);

    try {
      const file = await this.vault.create(filePath, frontmatterContent);
      await this.fileManager.processFrontMatter(file, (fm) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        fm['tags'] = BookNoteTag;
      });
      if (get(settingsStore).useObsidianFileProperties) {
        const frontMatter = bookToFrontMatter(book, highlightsCount);
        await this.fileManager.processFrontMatter(file, (fm) => {
          Object.assign(fm, metadata);
          Object.assign(fm, frontMatter);
        });
      }
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
  ): Promise<string> {
    try {
      return this.vault.process(kindleFile.file, () => {
        return this.generateBookContent(remoteBook, content, highlightsCount);
      });
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

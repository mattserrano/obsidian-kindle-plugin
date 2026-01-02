import { addIcon, Plugin, setIcon } from 'obsidian';
import { get } from 'svelte/store';

import highlightSyncIcon from '~/assets/fileSyncIcon.svg';
import kindleIcon from '~/assets/kindleIcon.svg';
import SyncModal from '~/components/syncModal';
import { ee } from '~/eventEmitter';
import KindleFileManager from '~/fileManager';
import { registerNotifications } from '~/notifications';
import { SettingsTab } from '~/settings';
import { initializeStores, settingsStore } from '~/store';
import { SyncAmazon, SyncClippings, SyncManager } from '~/sync';

addIcon('kindle', kindleIcon);
addIcon('highlight-sync', highlightSyncIcon);

export default class KindlePlugin extends Plugin {
  private fileManager!: KindleFileManager;
  private syncAmazon!: SyncAmazon;
  private syncClippings!: SyncClippings;
  private statusBar: HTMLElement;

  public async onload(): Promise<void> {
    console.log('Kindle Highlights plugin: loading plugin', new Date().toLocaleString());

    this.fileManager = new KindleFileManager(this.app.fileManager, this.app.vault, this.app.metadataCache);
    const syncManager = new SyncManager(this.fileManager);

    await initializeStores(this, this.fileManager);

    this.syncAmazon = new SyncAmazon(syncManager);
    this.syncClippings = new SyncClippings(syncManager);

    this.addRibbonIcon('kindle', 'Sync your Kindle highlights', async () => {
      await this.showSyncModal();
    });

    this.statusBar = this.addStatusBarItem();
    setIcon(this.statusBar, 'highlight-sync');

    this.addCommand({
      id: 'kindle-sync',
      name: 'Sync highlights',
      callback: async () => {
        await this.showSyncModal();
      },
    });

    this.addSettingTab(new SettingsTab(this.app, this, this.fileManager));

    registerNotifications();
    this.registerStatusBar();
    this.registerEvents();
  }

  private registerStatusBar(): void {
    ee.on('loginComplete', (success: boolean) => {
      if (success) {
        // make highlight-sync green
      } else {
        // make icon red
      }
    });

    ee.on('logoutSuccess', () => {
      this.statusBar.detach();
    });
  }

  private registerEvents(): void {
    this.registerEvent(
      this.app.workspace.on('file-menu', (menu, file) => {
        const kindleFile = this.fileManager.mapToKindleFile(file);
        if (kindleFile == null) {
          return;
        }

        menu.addItem((item) => {
          item
            .setTitle('Resync Kindle highlights in file')
            .setIcon('kindle')
            .setDisabled(kindleFile.book.asin == null)
            .onClick(async () => {
              await this.syncAmazon.resync(kindleFile);
            });
        });
      })
    );

    this.app.workspace.onLayoutReady(async () => {
    if (get(settingsStore).syncOnBoot) {
      await this.startAmazonSync();
    }
      ee.emit('obsidianReady');
    });
  }

  private async showSyncModal(): Promise<void> {
    await new SyncModal(this.app, {
      onOnlineSync: () => this.startAmazonSync(),
      onMyClippingsSync: () => this.syncClippings.startSync(),
    }).show();
  }

  private async showSyncStatusDropdown(): Promise<void> {
    // show status bar
  }

  private async startAmazonSync(): Promise<void> {
    await this.syncAmazon.startSync();
  }

  public onunload(): void {
    ee.removeAllListeners();
    console.log('Kindle Highlights plugin: unloading plugin', new Date().toLocaleString());
  }
}

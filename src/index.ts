import { addIcon, Plugin, setIcon, setTooltip } from 'obsidian';
import { get } from 'svelte/store';

import toolbarIcon from '~/assets/fileSyncIcon.svg';
import kindleIcon from '~/assets/kindleIcon.svg';
import SyncModal from '~/components/syncModal';
import { ee } from '~/eventEmitter';
import KindleFileManager from '~/fileManager';
import { strings } from '~/i18n';
import { registerNotifications } from '~/notifications';
import { SettingsTab } from '~/settings';
import { initializeStores, settingsStore } from '~/store';
import { SyncAmazon, SyncClippings, SyncManager } from '~/sync';

addIcon('kindle', kindleIcon);
addIcon('kindle-toolbar', toolbarIcon);

export default class KindlePlugin extends Plugin {
  private fileManager!: KindleFileManager;
  private syncAmazon!: SyncAmazon;
  private syncClippings!: SyncClippings;
  private statusBar!: HTMLElement;

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
    setIcon(this.statusBar, 'kindle-toolbar');

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
    this.statusBar.addEventListener('mouseenter', () => {
      this.showSyncTooltip();
    });

    // login states
    ee.on('loginComplete', (success: boolean) => {
      if (success) {
        this.updateStatusBar('green');
      } else {
        this.updateStatusBar('red');
      }
    });

    // sync states
    ee.on('syncSessionStart', () => {
      this.statusBar.style.display = '';
      this.updateStatusBar('green');
    });

    ee.on('syncSessionSuccess', () => {
      this.updateStatusBar('currentColor');
    });

    ee.on('syncSessionFailure', () => {
      this.updateStatusBar('red');
    });

    ee.on('resyncBook', () => {
      this.updateStatusBar('green');
    });
    
    ee.on('resyncComplete', () => {
      this.updateStatusBar('currentColor');
    });

    ee.on('resyncFailure', () => {
      this.updateStatusBar('red');
    });

    // logout state
    ee.on('logoutSuccess', () => {
      // detach status bar
      this.statusBar.style.display = 'none';
    });

    ee.on('toggleHighlightsToolbar', (show: boolean) => {
      if (show) {
        this.statusBar.style.display = '';
      } else {
        this.statusBar.style.display = 'none';
      }
    });
  }

  private updateStatusBar(color: string): void {
    if (get(settingsStore).showHighlightsToolbar) {
      this.statusBar.style.display = '';
    } else {
      this.statusBar.style.padding = '0px';
      this.statusBar.style.display = 'none';
    }

    document.documentElement.style.setProperty('--kindle-toolbar-fill', color);
  }

  private registerEvents(): void {
    this.registerEvent(
      this.app.workspace.on('file-menu', (menu, file) => {
        const kindleFile = this.fileManager.mapToKindleFile(file);
        if (kindleFile == null) {
          return;
        }
        
        menu.addItem((item) => {
          item.setTitle(strings.fileMenu.resyncTitle)
            .setIcon('kindle')
            .setDisabled(kindleFile.book?.asin == null)
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

  private showSyncTooltip(): void {
    // show status bar
    setTooltip(
      this.statusBar,
      get(settingsStore).lastSyncDate
        ? strings.settings.account.lastSync + new Date(get(settingsStore).lastSyncDate).toLocaleString()
        : strings.settings.account.neverSynced,
        {
          placement: 'top',
        }
    );
  }

  private async startAmazonSync(): Promise<void> {
    await this.syncAmazon.startSync();
  }

  public onunload(): void {
    ee.removeAllListeners();
    console.log('Kindle Highlights plugin: unloading plugin', new Date().toLocaleString());
  }
}

import _ from 'lodash';
import { App, PluginSettingTab, Setting } from 'obsidian';
import { get } from 'svelte/store';

import type KindlePlugin from '~/.';
import { AmazonRegions, orderedAmazonRegions } from '~/amazonRegion';
import { ee } from '~/eventEmitter';
import type KindleFileManager from '~/fileManager';
import { strings } from '~/i18n';
import type { AmazonAccountRegion } from '~/models';
import { clearSessionData } from '~/scraper';
import { settingsStore } from '~/store';

import TemplateEditorModal from './templateEditorModal';

const { moment } = window;

type AdapterFile = {
  type: 'folder' | 'file';
};

export class SettingsTab extends PluginSettingTab {
  constructor(app: App, plugin: KindlePlugin, private fileManager: KindleFileManager) {
    super(app, plugin);
    this.app = app;
  }

  public display(): void {
    const { containerEl } = this;

    containerEl.empty();

    if (get(settingsStore).isLoggedIn) {
      this.logout();
    }

    this.templatesEditor();
    this.highlightsFolder();
    this.baseFolder();
    this.amazonRegion();
    this.downloadBookMetadata();
    this.downloadHighResImages();
    this.syncOnBoot();
    this.sponsorMe();
  }

  private templatesEditor(): void {
    new Setting(this.containerEl)
      .setName(strings.settings.templates.title)
      .setDesc(strings.settings.templates.description)
      .addButton((button) => {
        button
          .setButtonText(strings.settings.templates.button)
          .onClick(() => {
            new TemplateEditorModal(this.app).show();
          });
      });
  }

  private logout(): void {
    const syncMessage = get(settingsStore).lastSyncDate
      ? `Last sync ${moment(get(settingsStore).lastSyncDate).fromNow()}`
      : 'Sync has never run';

    const kindleFiles = this.fileManager.getKindleFiles();

    const descFragment = document.createRange().createContextualFragment(`
      ${kindleFiles.length} book(s) synced<br/>
      ${syncMessage}
    `);

    new Setting(this.containerEl)
      .setName(strings.settings.account.title)
      .setDesc(descFragment)
      .addButton((button) => {
        return button
          .setButtonText(strings.settings.account.buttonDefault)
          .setCta()
          .onClick(async () => {
            button.removeCta().setButtonText(strings.settings.account.buttonPressed).setDisabled(true);

            ee.emit('startLogout');

            try {
              await clearSessionData();

              settingsStore.actions.logout();
            } catch (error) {
              console.error('Error when trying to logout', error);
              ee.emit('logoutFailure');
            }

            ee.emit('logoutSuccess');

            this.display(); // rerender
          });
      });
  }

  private amazonRegion(): void {
    new Setting(this.containerEl)
      .setName(strings.settings.region.title)
      .setDesc(strings.settings.region.description)
      .addDropdown((dropdown) => {
        orderedAmazonRegions().forEach((region: AmazonAccountRegion) => {
          const account = AmazonRegions[region];
          dropdown.addOption(region, `${account.name} (${account.hostname})`);
        });

        return dropdown
          .setValue(get(settingsStore).amazonRegion)
          .onChange((value: AmazonAccountRegion) => {
            settingsStore.actions.setAmazonRegion(value);
          });
      });
  }

  private highlightsFolder(): void {
    new Setting(this.containerEl)
      .setName(strings.settings.highlightsFolder.title)
      .setDesc(strings.settings.highlightsFolder.descriotion)
      .addDropdown((dropdown) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
        const files = (this.app.vault.adapter as any).files as AdapterFile[];
        const folders = _.pickBy(files, (val) => {
          return val.type === 'folder';
        });

        Object.keys(folders).forEach((val) => {
          dropdown.addOption(val, val);
        });
        return dropdown.setValue(get(settingsStore).highlightsFolder).onChange((value) => {
          settingsStore.actions.setHighlightsFolder(value);
        });
      });
  }

  private baseFolder(): void {
    new Setting(this.containerEl)
      .setName(strings.settings.highlightsBaseFolder.title)
      .setDesc(strings.settings.highlightsBaseFolder.description)
      .addButton((button => {
        button.setButtonText(strings.settings.highlightsBaseFile.button).onClick(async () => {
          const baseFolder = get(settingsStore).baseFolder;
          try {
            await this.fileManager.createBaseFile(baseFolder);
            ee.emit('createHighlightBaseSuccess');
          } catch (error) {
            ee.emit('createHighlightBaseFailure', String(error));
          }
        });
      }))
      .addDropdown((dropdown) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
        const files = (this.app.vault.adapter as any).files as AdapterFile[];
        const folders = _.pickBy(files, (val) => {
          return val.type === 'folder';
        });

        Object.keys(folders).forEach((val) => {
          dropdown.addOption(val, val);
        });
        return dropdown.setValue(get(settingsStore).baseFolder).onChange((value) => {
          settingsStore.actions.setBasesFolder(value);
        });
      });
  }

  private downloadBookMetadata(): void {
    new Setting(this.containerEl)
      .setName(strings.settings.downloadBookMetadata.title)
      .setDesc(strings.settings.downloadBookMetadata.description)
      .addToggle((toggle) =>
        toggle.setValue(get(settingsStore).downloadBookMetadata).onChange((value) => {
          settingsStore.actions.setDownloadBookMetadata(value);
        })
      );
  }

  private downloadHighResImages(): void {
    new Setting(this.containerEl)
      .setName(strings.settings.downloadHighResImages.title)
      .setDesc(strings.settings.downloadHighResImages.description)
      .addToggle((toggle) =>
        toggle.setValue(get(settingsStore).downloadHighResImages).onChange((value) => {
          settingsStore.actions.setDownloadHighResImages(value);
        })
      );
  }

  private syncOnBoot(): void {
    new Setting(this.containerEl)
      .setName(strings.settings.syncOnStartup.title)
      .setDesc(strings.settings.syncOnStartup.description)
      .addToggle((toggle) =>
        toggle.setValue(get(settingsStore).syncOnBoot).onChange((value) => {
          settingsStore.actions.setSyncOnBoot(value);
        })
      );
  }

  private sponsorMe(): void {
    new Setting(this.containerEl)
      .setName(strings.settings.sponsor.title)
      .setDesc(strings.settings.sponsor.description)
      .addButton((bt) => {
        bt.buttonEl.outerHTML = `<a href="https://www.buymeacoffee.com/hadynz"><img style="height: 35px;" src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=hadynz&button_colour=BD5FFF&font_colour=ffffff&font_family=Lato&outline_colour=000000&coffee_colour=FFDD00"></a>`;
      });
  }
}

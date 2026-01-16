import _ from 'lodash';
import { App, PluginSettingTab, SettingGroup } from 'obsidian';
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

    this.accountSettings();
    this.highlightSettings();
    this.hightlightBaseSettings();
    this.sponsorMe();
  }

  private accountSettings(): void {
    const syncMessage = get(settingsStore).lastSyncDate
      ? strings.settings.account.lastSync + moment(get(settingsStore).lastSyncDate).fromNow()
      : strings.settings.account.neverSynced;

    const kindleFiles = this.fileManager.getKindleFiles();

    const descFragment = document.createRange().createContextualFragment(`
      ${kindleFiles.length} ${strings.settings.account.booksSynced}<br/>
      ${syncMessage}
    `);

    const group = new SettingGroup(this.containerEl);
    group.setHeading(strings.settings.groups.account);

    if (get(settingsStore).isLoggedIn) {
      group.addSetting(setting => {
        setting.setName(strings.settings.account.title);
        setting.setDesc(descFragment);
        setting.addButton((button) => {
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
      });
    }

    group.addSetting(setting => {
      setting.setName(strings.settings.region.title);
      setting.setDesc(strings.settings.region.description);
      setting.addDropdown((dropdown) => {
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
    });

    group.addSetting(setting => {
      setting.setName(strings.settings.downloadBookMetadata.title)
      setting.setDesc(strings.settings.downloadBookMetadata.description)
      setting.addToggle((toggle) =>
        toggle.setValue(get(settingsStore).downloadBookMetadata).onChange((value) => {
          settingsStore.actions.setDownloadBookMetadata(value);
        })
      );
    });

    group.addSetting(setting => {
      setting.setName(strings.settings.downloadHighResImages.title)
      setting.setDesc(strings.settings.downloadHighResImages.description)
      setting.addToggle((toggle) =>
        toggle.setValue(get(settingsStore).downloadHighResImages).onChange((value) => {
          settingsStore.actions.setDownloadHighResImages(value);
        })
      );
    });

    group.addSetting(setting => {
      setting.setName(strings.settings.syncOnStartup.title)
      setting.setDesc(strings.settings.syncOnStartup.description)
      setting.addToggle((toggle) =>
        toggle.setValue(get(settingsStore).syncOnBoot).onChange((value) => {
          settingsStore.actions.setSyncOnBoot(value);
        })
      );
    });
  }

  private highlightSettings(): void {
    const group = new SettingGroup(this.containerEl);
    group.setHeading(strings.settings.groups.highlights);
    
    group.addSetting(setting => {
      setting.setName(strings.settings.highlightsFolder.title)
      setting.setDesc(strings.settings.highlightsFolder.descriotion)
      setting.addDropdown((dropdown) => {
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
    });

    group.addSetting(setting => {
      setting.setName(strings.settings.templates.title)
      setting.setDesc(strings.settings.templates.description)
      setting.addButton((button) => {
        button
          .setButtonText(strings.settings.templates.button)
          .onClick(() => {
            new TemplateEditorModal(this.app).show();
          });
      });
    });

    group.addSetting(setting => {
      setting.setName(strings.settings.useObsidianFileProperties.title)
      setting.setDesc(strings.settings.useObsidianFileProperties.description)
      setting.addToggle((toggle) =>
        toggle.setValue(get(settingsStore).useObsidianFileProperties).onChange((value) => {
          settingsStore.actions.useObsidianFileProperties(value);
        })
      );
    });
  }

  private hightlightBaseSettings(): void {
    const group = new SettingGroup(this.containerEl);
    group.setHeading(strings.settings.groups.bases);
    group.addSetting(setting => {
      setting.setName(strings.settings.highlightsBaseFolder.title)
      setting.setDesc(strings.settings.highlightsBaseFolder.description)
      setting.addButton((button => {
        button.setButtonText(strings.settings.highlightsBaseFile.button).onClick(async () => {
          const baseFolder = get(settingsStore).baseFolder;
          try {
            await this.fileManager.createBaseFile(baseFolder);
            ee.emit('createHighlightBaseSuccess');
          } catch (error) {
            ee.emit('createHighlightBaseFailure', String(error));
          }
        });
      })).addDropdown((dropdown) => {
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
    });
  }

  private sponsorMe(): void {
    const group = new SettingGroup(this.containerEl);
    group.setHeading(strings.settings.groups.advanced);
    group.addSetting(setting => {
      setting.setName(strings.settings.sponsor.title);
      setting.setDesc(strings.settings.sponsor.description);
      setting.addButton((bt) => {
        bt.buttonEl.outerHTML = `<a href="https://www.buymeacoffee.com/hadynz"><img style="height: 35px;" src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=hadynz&button_colour=BD5FFF&font_colour=ffffff&font_family=Lato&outline_colour=000000&coffee_colour=FFDD00"></a>`;
      });
    });
  }
}

import type KindlePlugin from '~/.';
import type KindleFileManager from '~/fileManager';

import { fileStore } from './fileStore';
import { settingsStore } from './settingsStore';

const initializeStores = async (
  plugin: KindlePlugin,
  fileManager: KindleFileManager,
): Promise<void> => {
  await settingsStore.initialize(plugin);
  fileStore.initialize(fileManager);
};

export { fileStore, initializeStores, settingsStore };

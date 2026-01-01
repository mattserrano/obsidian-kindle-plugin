import { App, Modal } from 'obsidian';

import { strings } from '~/i18n';
import type { SyncMode } from '~/models';

import { store, SyncModalState } from './store';
import SyncModalContent from './SyncModalContent.svelte';

const SyncModalTitle: Record<SyncModalState['status'], string> = {
  'upgrade-warning': strings.syncModal.breakingChangeNotice,
  'first-time': strings.syncModal.initialSync,
  'idle': strings.syncModal.yourHighlights,
  'sync:fetching-books': strings.syncModal.syncingTitle,
  'sync:login': strings.syncModal.syncingTitle,
  'sync:syncing': strings.syncModal.syncingTitle,
  'choose-sync-method': strings.syncModal.chooseSyncMethod,
};

type SyncModalProps = {
  onOnlineSync: () => void;
  onMyClippingsSync: () => void;
};

export default class SyncModal extends Modal {
  private modalContent: SyncModalContent;

  constructor(app: App, private props: SyncModalProps) {
    super(app);
  }

  public async show(): Promise<void> {
    const initialState: SyncModalState['status'] = 'idle';
    store.update((state) => ({ ...state, status: initialState }));

    this.modalContent = new SyncModalContent({
      target: this.contentEl,
      props: {
        onDone: () => {
          this.close();
        },
        onClick: (mode: SyncMode) => {
          if (mode === 'amazon') {
            this.props.onOnlineSync();
          } else {
            this.props.onMyClippingsSync();
          }
        },
      },
    });

    store.subscribe((state) => {
      this.titleEl.innerText = SyncModalTitle[state.status];
    });

    return Promise.resolve(this.open());
  }

  onClose(): void {
    super.onClose();
    this.modalContent.$destroy();
  }
}

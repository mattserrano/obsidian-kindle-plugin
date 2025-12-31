import { App, Modal } from 'obsidian';

import type { SyncMode } from '~/models';

import { store, SyncModalState } from './store';
import SyncModalContent from './SyncModalContent.svelte';

const SyncModalTitle: Record<SyncModalState['status'], string> = {
  'upgrade-warning': 'Breaking change notice',
  'first-time': '',
  idle: 'Your Kindle highlights',
  'sync:fetching-books': 'Syncing data...',
  'sync:login': 'Syncing data...',
  'sync:syncing': 'Syncing data...',
  'choose-sync-method': 'Choose a sync method...',
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

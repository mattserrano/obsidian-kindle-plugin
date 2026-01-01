<script lang="ts">
  import SyncStats from './SyncStats.svelte';
  import { strings } from '~/i18n';

  export let onClick: () => void;
</script>

<SyncStats />
<div class="setting-item-control">
  <button class="mod-cta" on:click={onClick}>{strings.syncModal.initialSync}</button>
</div>

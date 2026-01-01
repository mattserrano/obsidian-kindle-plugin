<script lang="ts">
  export let heading: string = ''
  export let name: string;
  export let description: string = '';
</script>

<div class="setting-item vertical">
  {#if description !== ''}
    <div class="setting-item-heading">{heading}</div>
  {/if}
  <div class="setting-item-label">
    <div class="setting-item-name">{name}</div>
    {#if description !== ''}
      <div class="setting-item-description">{description}</div>
    {/if}
  </div>
  <slot />
</div>

<style>
  .vertical {
    flex-direction: column;
    align-items: start;
  }

  .setting-item-label {
    margin-bottom: 10px;
  }
</style>

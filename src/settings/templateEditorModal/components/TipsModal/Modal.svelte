<script lang="ts">
  import Chip from './Chip.svelte';
  import CommonVariables from './CommonVariables.svelte';

  import type { TemplateTab } from '../../types';

  import { strings } from '~/i18n';

  export let template: TemplateTab;
</script>

<div id="wrapper">
  {#if template === 'file-name'}
    <table>
      <tbody>
        <CommonVariables />
      </tbody>
    </table>
  {:else if template === 'file'}
    <table>
      <tbody>
        <CommonVariables />
        <tr>
          <td><Chip title={'asin'} /></td>
          <td>{strings.tipsModal.asinTip}</td>
        </tr>
        <tr>
          <td><Chip title={'url'} /></td>
          <td>{strings.tipsModal.urlTip}</td>
        </tr>
        <tr>
          <td><Chip title={'imageUrl'} /></td>
          <td>{strings.tipsModal.imageUrlTip}</td>
        </tr>
        <tr>
          <td><Chip title={'lastAnnotatedDate'} /></td>
          <td>{strings.tipsModal.lastAnnotatedDateTip}</td>
        </tr>
        <tr>
          <td><Chip title={'appLink'} /></td>
          <td>{strings.tipsModal.appLinkTip}</td>
        </tr>
        <tr>
          <td><Chip title={'isbn'} /></td>
          <td>{strings.tipsModal.isbnTip}</td>
        </tr>
        <tr>
          <td><Chip title={'pages'} /></td>
          <td>{strings.tipsModal.pagesTip}</td>
        </tr>
        <tr>
          <td><Chip title={'publicationDate'} /></td>
          <td>{strings.tipsModal.publicationDateTip}</td>
        </tr>
        <tr>
          <td><Chip title={'publisher'} /></td>
          <td>{strings.tipsModal.publisherTip}</td>
        </tr>
        <tr>
          <td><Chip title={'authorUrl'} /></td>
          <td>{strings.tipsModal.authorUrl}</td>
        </tr>
        <tr>
          <td><Chip title={'highlightsCount'} /></td>
          <td>{strings.tipsModal.highlightsCountTip}<span class="mute">{strings.tipsModal.alwaysSet}</span></td>
        </tr>
        <tr>
          <td><Chip title={'highlights'} /></td>
          <td>{strings.tipsModal.highlightsTip}<span class="mute">- (always set)</span></td>
        </tr>
      </tbody>
    </table>
  {:else if template === 'highlight'}
    <table>
      <tbody>
        <CommonVariables />
        <tr /><tr>
          <td><Chip title={'text'} /></td>
          <td>{strings.tipsModal.textTip}<span class="mute">{strings.tipsModal.alwaysSet}</span></td>
        </tr>
        <tr>
          <td><Chip title={'location'} /></td>
          <td>{strings.tipsModal.locationTip}</td>
        </tr>
        <tr>
          <td><Chip title={'page'} /></td>
          <td>{strings.tipsModal.pageTip}</td>
        </tr>
        <tr>
          <td><Chip title={'note'} /></td>
          <td>{strings.tipsModal.noteTip}</td>
        </tr>
        <tr>
          <td><Chip title={'color'} /></td>
          <td>{strings.tipsModal.colorTip}</td>
        </tr>
        <tr>
          <td><Chip title={'createdDate'} /></td>
          <td
            >{strings.tipsModal.creationDateTip} <br /><span class="mute"
              >
              <a href="https://momentjs.com/docs/#/displaying/format/"
                >(momentjs format strings)</a
              > 
              <Chip title={'createdDate | date("DD-MM-YYYY")'} /></span
            >
          </td>
        </tr>
        <tr>
          <td><Chip title={'appLink'} /></td>
          <td>{strings.tipsModal.appLinkTip}</td>
        </tr>
      </tbody>
    </table>
  {/if}
</div>

<style>
  #wrapper {
    max-height: 500px;
    overflow-y: auto;
  }

  table {
    display: grid;
    min-width: 100%;
    grid-template-columns: auto auto;
    column-gap: 1rem;
    row-gap: 1rem;
  }

  #wrapper :global(tbody),
  #wrapper :global(tr) {
    display: contents;
  }

  #wrapper :global(tr td:nth-child(2)) {
    font-size: 0.8em;
  }

  #wrapper :global(.mute) {
    color: var(--text-muted);
  }
</style>

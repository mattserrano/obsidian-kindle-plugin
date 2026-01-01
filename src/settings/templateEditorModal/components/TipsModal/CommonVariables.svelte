<script lang="ts">
  import Chip from './Chip.svelte';

  import { strings } from '~/i18n';
</script>

<tr>
  <td><Chip title={'title'} /></td>
  <td>{strings.tipsModal.shortBookTitleTip}<span class="mute">{strings.tipsModal.alwaysSet}</span></td>
</tr>
<tr>
  <td><Chip title={'longTitle'} /></td>
  <td>{strings.tipsModal.longTitleTip}<span class="mute">{strings.tipsModal.alwaysSet}</span></td>
</tr>
<tr>
  <td><Chip title={'author'} /></td>
  <td>{strings.tipsModal.authorTip}<span class="mute">{strings.tipsModal.alwaysSet}</span></td>
</tr>
<tr>
  <td><Chip title={'authorsLastNames'} /></td>
  <td>{strings.tipsModal.authorsLastNamesTip}<span class="mute">{strings.tipsModal.authorsLastNamesExampleTip}{strings.tipsModal.alwaysSet}</span></td>
</tr>
<tr>
  <td><Chip title={'firstAuthorFirstName'} /></td>
  <td>{strings.tipsModal.firstAuthorFirstNameTip}<span class="mute">{strings.tipsModal.alwaysSet}</span></td>
</tr>
<tr>
  <td><Chip title={'firstAuthorLastName'} /></td>
  <td>{strings.tipsModal.firstAuthorLastNameTip}<span class="mute">{strings.tipsModal.alwaysSet}</span></td>
</tr>
<tr>
  <td><Chip title={'secondAuthorFirstName'} /></td>
  <td>{strings.tipsModal.secondAuthorFirstNameTip}</td>
</tr>
<tr>
  <td><Chip title={'secondAuthorLastName'} /></td>
  <td>{strings.tipsModal.secondAuthorLastNameTip}</td>
</tr>

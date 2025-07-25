<script lang="ts">
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from '@podman-desktop/ui-svelte';

import type { ILoadingStatus } from '../preferences/Util';
import LoadingIcon from './LoadingIcon.svelte';
import { capitalize } from './Util';

interface Props {
  action: string;
  icon: IconDefinition;
  state?: ILoadingStatus;
  leftPosition: string;
  color?: 'primary' | 'secondary';
  tooltip?: string;
  clickAction: () => Promise<void> | void;
}

const {
  action,
  icon,
  state,
  leftPosition,
  color = 'secondary',
  tooltip = capitalize(action),
  clickAction,
}: Props = $props();

const disable = $derived.by(() => {
  if (state?.inProgress || state?.status === 'unsupported') {
    return true;
  }

  switch (action) {
    case 'start':
      return state?.status !== 'stopped' && state?.status !== 'failed';
    case 'restart':
      return state?.status !== 'started';
    case 'stop':
      return state?.status !== 'started' && state?.status !== 'starting';
    case 'delete':
      return state?.status !== 'failed' && state?.status !== 'stopped' && state?.status !== 'unknown';
    case 'update':
      return state?.status === 'unknown';
    case 'edit':
      return state?.status !== 'started' && state?.status !== 'stopped';
  }
});

const loading = $derived(state?.inProgress && action === state?.action);

const style = $derived(
  disable
    ? 'text-[var(--pd-action-button-disabled-text)] cursor-not-allowed'
    : color === 'secondary'
      ? 'text-[var(--pd-action-button-text)] hover:text-[var(--pd-action-button-hover-text)]'
      : 'text-[var(--pd-action-button-primary-text)] hover:text-[var(--pd-action-button-primary-hover-text)]',
);
</script>

<Tooltip bottom tip={tooltip}>
  <button aria-label={capitalize(action)} class="px-2.5 py-2 {style}" onclick={clickAction} disabled={disable}>
    <LoadingIcon
      icon={icon}
      loadingWidthClass="w-6"
      loadingHeightClass="h-6"
      positionTopClass="top-0.5"
      positionLeftClass={leftPosition}
      loading={loading} />
  </button>
</Tooltip>

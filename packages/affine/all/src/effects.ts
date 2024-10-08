import { effects as blocksEffects } from '@algogrind/blocks/effects';
import { effects as presetsEffects } from '@algogrind/presets/effects';

export function effects() {
  blocksEffects();
  presetsEffects();
}

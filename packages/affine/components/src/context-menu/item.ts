import { ShadowlessElement } from '@algogrind/block-std';
import { SignalWatcher, WithDisposable } from '@algogrind/global/utils';
import { property } from 'lit/decorators.js';

import type { Menu } from './menu.js';

export abstract class MenuItem extends SignalWatcher(
  WithDisposable(ShadowlessElement)
) {
  @property({ attribute: false })
  accessor menu!: Menu;
}

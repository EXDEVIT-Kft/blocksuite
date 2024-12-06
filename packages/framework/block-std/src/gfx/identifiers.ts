import type { ServiceIdentifier } from '@algogrind/global/di';

import type { GfxController } from './controller.js';

import { LifeCycleWatcherIdentifier } from '../identifier.js';

export const gfxControllerKey = 'GfxController';

export const GfxControllerIdentifier = LifeCycleWatcherIdentifier(
  gfxControllerKey
) as ServiceIdentifier<GfxController>;

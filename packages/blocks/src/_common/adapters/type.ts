import type { BaseAdapter, Job } from '@algogrind/store';

import { createIdentifier } from '@algogrind/global/di';

export type AdapterFactory = {
  // TODO(@chen): Make it return the specific adapter type
  get: (job: Job) => BaseAdapter;
};

export const AdapterFactoryIdentifier =
  createIdentifier<AdapterFactory>('AdapterFactory');

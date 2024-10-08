import type { BlockCommands } from '@algogrind/block-std';

import { reassociateConnectorsCommand } from './reassociate-connectors.js';

export const commands: BlockCommands = {
  reassociateConnectors: reassociateConnectorsCommand,
};

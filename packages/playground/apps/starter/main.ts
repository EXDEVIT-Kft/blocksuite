import {
  type ExtensionType,
  WidgetViewMapExtension,
  WidgetViewMapIdentifier,
} from '@algogrind/block-std';
import * as blocks from '@algogrind/blocks';
import {
  CommunityCanvasTextFonts,
  DocModeProvider,
  FontConfigExtension,
  ParseDocUrlProvider,
  QuickSearchProvider,
  RefNodeSlotsExtension,
  RefNodeSlotsProvider,
} from '@algogrind/blocks';
import { effects as blocksEffects } from '@algogrind/blocks/effects';
import * as globalUtils from '@algogrind/global/utils';
import * as editor from '@algogrind/presets';
import { effects as presetsEffects } from '@algogrind/presets/effects';
import * as store from '@algogrind/store';

import '../../style.css';
import { mockDocModeService } from '../_common/mock-services.js';
import { setupEdgelessTemplate } from '../_common/setup.js';
import '../dev-format.js';
import {
  createStarterDocCollection,
  initStarterDocCollection,
} from './utils/collection.js';
import { mountDefaultDocEditor } from './utils/editor.js';

blocksEffects();
presetsEffects();

async function main() {
  if (window.collection) return;

  setupEdgelessTemplate();

  const params = new URLSearchParams(location.search);
  const room = params.get('room') ?? Math.random().toString(16).slice(2, 8);
  const isE2E = room.startsWith('playwright');
  const collection = createStarterDocCollection();

  if (isE2E) {
    Object.defineProperty(window, '$blocksuite', {
      value: Object.freeze({
        store,
        blocks,
        global: { utils: globalUtils },
        editor,
        identifiers: {
          WidgetViewMapIdentifier,
          QuickSearchProvider,
          DocModeProvider,
          RefNodeSlotsProvider,
          ParseDocUrlService: ParseDocUrlProvider,
        },
        defaultExtensions: (): ExtensionType[] => [
          FontConfigExtension(CommunityCanvasTextFonts),
          RefNodeSlotsExtension(),
        ],
        extensions: {
          FontConfigExtension: FontConfigExtension(CommunityCanvasTextFonts),
          WidgetViewMapExtension,
          RefNodeSlotsExtension: RefNodeSlotsExtension(),
        },
        mockServices: {
          mockDocModeService,
        },
      }),
    });

    // test if blocksuite can run in a web worker, SEE: tests/worker.spec.ts
    // window.testWorker = new Worker(
    //   new URL('./utils/test-worker.ts', import.meta.url),
    //   {
    //     type: 'module',
    //   }
    // );

    return;
  }

  await initStarterDocCollection(collection);
  await mountDefaultDocEditor(collection);
}

main().catch(console.error);

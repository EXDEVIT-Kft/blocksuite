import type { BlockSuiteFlags } from '@algogrind/global/types';

import { AffineSchemas } from '@algogrind/blocks';
import {
  DocCollection,
  type DocCollectionOptions,
  IdGeneratorType,
  Job,
  Schema,
  Text,
} from '@algogrind/store';
import {
  BroadcastChannelAwarenessSource,
  BroadcastChannelDocSource,
  IndexedDBBlobSource,
  IndexedDBDocSource,
} from '@algogrind/sync';

import { WebSocketAwarenessSource } from '../../_common/sync/websocket/awareness';
import { WebSocketDocSource } from '../../_common/sync/websocket/doc';

const BASE_WEBSOCKET_URL = new URL(import.meta.env.PLAYGROUND_WS);

export async function createDefaultDocCollection() {
  const idGenerator: IdGeneratorType = IdGeneratorType.NanoID;
  const schema = new Schema();
  schema.register(AffineSchemas);

  const params = new URLSearchParams(location.search);
  let docSources: DocCollectionOptions['docSources'] = {
    main: new IndexedDBDocSource(),
  };
  let awarenessSources: DocCollectionOptions['awarenessSources'];
  const room = params.get('room');
  if (room) {
    const ws = new WebSocket(new URL(`/room/${room}`, BASE_WEBSOCKET_URL));
    await new Promise((resolve, reject) => {
      ws.addEventListener('open', resolve);
      ws.addEventListener('error', reject);
    })
      .then(() => {
        docSources = {
          main: new IndexedDBDocSource(),
          shadows: [new WebSocketDocSource(ws)],
        };
        awarenessSources = [new WebSocketAwarenessSource(ws)];
      })
      .catch(() => {
        docSources = {
          main: new IndexedDBDocSource(),
          shadows: [new BroadcastChannelDocSource()],
        };
        awarenessSources = [
          new BroadcastChannelAwarenessSource('collabPlayground'),
        ];
      });
  }

  const flags: Partial<BlockSuiteFlags> = Object.fromEntries(
    [...params.entries()]
      .filter(([key]) => key.startsWith('enable_'))
      .map(([k, v]) => [k, v === 'true'])
  );

  const options: DocCollectionOptions = {
    id: 'collabPlayground',
    schema,
    idGenerator,
    blobSources: {
      main: new IndexedDBBlobSource('collabPlayground'),
    },
    docSources,
    awarenessSources,
    defaultFlags: {
      // -> converting between different embed block styles
      // gets synced across the network automatically
      enable_synced_doc_block: true,
      // Edgeless -> shortcut: Q
      enable_pie_menu: true,
      // Database --->
      enable_database_number_formatting: true,
      enable_database_attachment_note: true,
      enable_database_full_width: true,
      enable_block_query: false,
      // <--- database
      enable_legacy_validation: false,
      // Edgeless extra items / config --->
      enable_lasso_tool: false,
      enable_edgeless_text: false,
      enable_color_picker: true,
      enable_mind_map_import: false,
      enable_shape_shadow_blur: true,
      enable_advanced_block_visibility: true,
      // <--- edgeless extra items / config
      enable_ai_onboarding: false,
      enable_ai_chat_block: false,
      // updated drag and drop feature
      enable_new_dnd: true,
      enable_mobile_keyboard_toolbar: true,
      enable_mobile_linked_doc_menu: false,
      // [ALGOGRIND] algogrind specific feature flags
      algogrind_enable_database: true,
      ...flags,
    },
  };
  const collection = new DocCollection(options);
  collection.start();

  // debug info
  window.collection = collection;
  window.blockSchemas = AffineSchemas;
  window.job = new Job({ collection });
  window.Y = DocCollection.Y;

  return collection;
}

export async function initDefaultDocCollection(collection: DocCollection) {
  const params = new URLSearchParams(location.search);

  await collection.waitForSynced();

  const shouldInit = collection.docs.size === 0 && !params.get('room');
  if (shouldInit) {
    collection.meta.initialize();
    const doc = collection.createDoc({ id: 'doc:home' });
    doc.load();
    const rootId = doc.addBlock('affine:page', {
      title: new Text(),
    });
    doc.addBlock('affine:surface', {}, rootId);
    doc.resetHistory();
  }
}

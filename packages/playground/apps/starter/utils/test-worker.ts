// This file is used to test blocksuite can run in a web worker. SEE: tests/worker.spec.ts

import '@algogrind/store';
// import '@algogrind/block-std'; // seems not working
import '@algogrind/blocks/schemas';

globalThis.onmessage = event => {
  const { data } = event;
  if (data === 'ping') {
    postMessage('pong');
  }
};

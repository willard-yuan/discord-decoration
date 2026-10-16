import { awebp2gif } from './awebp2gif-codec.js';
// Serialize conversions to keep peak memory and WASM state bounded.
let queue = Promise.resolve();
self.onmessage = ({ data: { id, buffer } }) => {
  queue = queue.then(async () => {
    try {
      const result = await awebp2gif(buffer);
      const transfers = [...new Set([result.arrayBuffer, result.data.buffer])];
      self.postMessage({ id, result }, transfers);
    } catch (error) {
      self.postMessage({ id, error: error.message || String(error) });
    }
  });
};

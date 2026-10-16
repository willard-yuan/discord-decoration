import ConversionWorker from './awebp2gif.worker.js?worker';
let worker;
let nextId = 0;
const pending = new Map();

function getWorker() {
  if (worker) return worker;
  worker = new ConversionWorker();
  worker.onmessage = ({ data }) => {
    const task = pending.get(data.id);
    if (!task) return;
    pending.delete(data.id);
    if (data.error) task.reject(new Error(data.error));
    else task.resolve(data.result);
  };
  worker.onerror = () => {
    for (const task of pending.values()) task.reject(new Error('Image conversion worker failed'));
    pending.clear();
    worker.terminate();
    worker = null;
  };
  return worker;
}

// Preserve the caller's buffer; only the copy is transferred to the worker.
export function awebp2gif(arraybuf) {
  return new Promise((resolve, reject) => {
    const target = getWorker();
    const id = ++nextId;
    const buffer = arraybuf.slice(0);
    pending.set(id, { resolve, reject });
    try { target.postMessage({ id, buffer }, [buffer]); }
    catch (error) { pending.delete(id); reject(error); }
  });
}

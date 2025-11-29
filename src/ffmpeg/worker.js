import { FFmpeg } from "@ffmpeg/ffmpeg";
import { toBlobURL } from "@ffmpeg/util";

let ffmpeg;

const init = async () => {
  if (ffmpeg) return;
  ffmpeg = new FFmpeg();

  ffmpeg.on('log', ({ message }) => {
    self.postMessage({ type: 'log', message });
  });

  ffmpeg.on('progress', ({ progress }) => {
    self.postMessage({ type: 'progress', progress });
  });

  // Load Single Threaded FFmpeg v0.12
  const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm';
  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
  });
};

self.onmessage = async ({ data }) => {
  const { id, type, payload } = data;
  try {
    let result;
    switch (type) {
      case 'init':
        await init();
        break;
      case 'exec':
        if (!ffmpeg) throw new Error('FFmpeg not initialized');
        result = await ffmpeg.exec(payload);
        if (result !== 0) throw new Error(`FFmpeg exited with code ${result}`);
        break;
      case 'writeFile':
        if (!ffmpeg) throw new Error('FFmpeg not initialized');
        await ffmpeg.writeFile(payload.path, payload.data);
        break;
      case 'readFile':
        if (!ffmpeg) throw new Error('FFmpeg not initialized');
        result = await ffmpeg.readFile(payload.path);
        // Transfer buffer if possible
        break;
      case 'deleteFile':
        if (!ffmpeg) throw new Error('FFmpeg not initialized');
        await ffmpeg.deleteFile(payload.path);
        break;
      case 'createDir':
        if (!ffmpeg) throw new Error('FFmpeg not initialized');
        await ffmpeg.createDir(payload.path);
        break;
      case 'deleteDir':
        if (!ffmpeg) throw new Error('FFmpeg not initialized');
        await ffmpeg.deleteDir(payload.path);
        break;
      case 'listDir':
        if (!ffmpeg) throw new Error('FFmpeg not initialized');
        result = await ffmpeg.listDir(payload.path);
        break;
      default:
        throw new Error(`Unknown command: ${type}`);
    }

    self.postMessage({
      id,
      type: 'success',
      result
    });
  } catch (error) {
    self.postMessage({
      id,
      type: 'error',
      error: error.message || error.toString()
    });
  }
};

import { toBlobURL } from "@ffmpeg/util";
import { storeData } from "@/utils/dataHandler";
import Worker from "./worker.js?worker";
import { getMimeTypeFromArrayBuffer } from "@/utils/fileType.js";

let worker;
let messageQueue = {};
let onProgressCallback = null;

const postMessageAsync = (type, payload) => {
  return new Promise((resolve, reject) => {
    if (!worker) {
      return reject(new Error("FFmpeg worker not initialized"));
    }
    const id = Math.random().toString(36).substring(7);
    messageQueue[id] = { resolve, reject };
    worker.postMessage({ id, type, payload });
  });
};

export const initFfmpeg = async (onProgress) => {
  if (worker) {
    onProgressCallback = onProgress;
    return;
  }

  worker = new Worker();
  
  worker.onmessage = ({ data }) => {
    const { id, type, result, error, message, progress } = data;

    if (type === 'log') {
      console.log(message);
      return;
    }

    if (type === 'progress') {
      if (onProgressCallback) onProgressCallback({ ratio: progress });
      return;
    }

    if (messageQueue[id]) {
      if (type === 'success') {
        messageQueue[id].resolve(result);
      } else {
        messageQueue[id].reject(new Error(error));
      }
      delete messageQueue[id];
    }
  };

  onProgressCallback = onProgress;
  await postMessageAsync('init');
  storeData("ffmpeg", ffmpeg); // Store the proxy
};

// Proxy object to mimic FFmpeg instance
export const ffmpeg = {
  writeFile: (path, data) => postMessageAsync('writeFile', { path, data }),
  readFile: (path) => postMessageAsync('readFile', { path }),
  deleteFile: (path) => postMessageAsync('deleteFile', { path }),
  createDir: (path) => postMessageAsync('createDir', { path }),
  deleteDir: (path) => postMessageAsync('deleteDir', { path }),
  listDir: (path) => postMessageAsync('listDir', { path }),
  exec: (args) => postMessageAsync('exec', args),
};

export const setFfmpeg = () => {}; // No-op for compatibility if needed

export const runFfmpegCommand = async (...args) => {
  try {
    await ffmpeg.exec(args);
  } catch (e) {
    console.error("FFmpeg run error:", e);
    throw e;
  }
};

export { toBlobURL };

// ... (Keep helper functions: getGifDuration, arraybuffer2base64, ffmpegFetchAndConvert)

/**
 * Calculates the duration of a GIF file.
 *
 * @param {ArrayBuffer} arraybuf - The GIF file as an ArrayBuffer.
 * @return {number} The duration of the GIF file in seconds.
 */
export function getGifDuration(arraybuf) {
  const uint8 = new Uint8Array(arraybuf);
  let duration = 0;
  for (let i = 0, len = uint8.length; i < len; i++) {
    if (
      uint8[i] === 0x21 &&
      uint8[i + 1] === 0xf9 &&
      uint8[i + 2] === 0x04 &&
      uint8[i + 7] === 0x00
    ) {
      const delay = (uint8[i + 5] << 8) | (uint8[i + 4] & 0xff);
      duration += delay < 2 ? 10 : delay;
    }
  }
  return duration / 100;
}

export function arraybuffer2base64(arraybuffer) {
  try {
    let binary = "";
    const bytes = new Uint8Array(arraybuffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  } catch {
    return "";
  }
}

import { fetchFile } from "@ffmpeg/util";

/**
 * Fetches and converts an image file to a format that ffmpeg supports.
 *
 * @param {Blob} blob - The image file as a Blob.
 * @return {Promise<{arrayBuffer: ArrayBuffer, data: Uint8Array, type: string}>} A promise that resolves with the converted image file.
 */
export async function ffmpegFetchAndConvert(blob) {
  const ab = await blob.arrayBuffer();
  const type = getMimeTypeFromArrayBuffer(ab);
  if (type == null) throw new Error("Invalid image type");

  if (type !== "image/webp") {
    return {
      arrayBuffer: ab,
      data: await fetchFile(blob),
      type,
    };
  }

  const u8arr = new Uint8Array(ab);
  const isAnimated = u8arr.slice(30, 34).join("") === "65787377";
  if (!isAnimated) {
    return {
      arrayBuffer: ab,
      data: await fetchFile(blob),
      type,
    };
  }

  return await (await import("@/utils/awebp2gif")).awebp2gif(ab);
}

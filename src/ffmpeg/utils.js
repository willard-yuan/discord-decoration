import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { printErr, printMsg } from "@/utils/print";
import { downloadWithProgress } from "@/utils/download";
import { storeData } from "@/utils/dataHandler";

export let /** @type {any} */ ffmpeg;
export const setFfmpeg = (/** @type {any} */ f) => (ffmpeg = f);

// Queue system for FFmpeg commands
let commandQueue = Promise.resolve();

export const runFfmpegCommand = async (...args) => {
  // Create a new promise that waits for the previous one
  const currentTask = commandQueue.then(async () => {
    if (!ffmpeg) throw new Error("FFmpeg not initialized");
    try {
      await ffmpeg.run(...args);
    } catch (e) {
      console.error("FFmpeg run error:", e);
      throw e;
    }
  });

  // Update the queue pointer to the new task, but catch errors so the queue doesn't stall
  commandQueue = currentTask.catch(() => {});
  
  // Return the task promise so the caller can await it (and catch its errors)
  return currentTask;
};

export const initFfmpeg = async (onProgress) => {
  // FFmpeg 0.11.x (single threaded) doesn't need crossOriginIsolated
  
  if (!ffmpeg) {
    ffmpeg = createFFmpeg({
      log: true,
      mainName: 'main',
      corePath: "https://unpkg.com/@ffmpeg/core-st@0.11.1/dist/ffmpeg-core.js",
      progress: ({ ratio }) => {
        if (onProgress) {
          onProgress({ ratio });
        }
      },
    });
    setFfmpeg(ffmpeg);
  } else {
    // Update progress callback if provided
    ffmpeg.setProgress(({ ratio }) => {
      if (onProgress) {
        onProgress({ ratio });
      }
    });
  }

  if (!ffmpeg.isLoaded()) {
    const loadPromise = ffmpeg.load();
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("FFmpeg load timed out")), 30000)
    );
    await Promise.race([loadPromise, timeoutPromise]);
  }
  
  storeData("ffmpeg", ffmpeg);
};

export function toBlobURL(url, mimeType) {
  // Dummy implementation for compatibility if needed, or remove if unused
  return Promise.resolve(url);
}


/**
 * Retrieves the MIME type of an ArrayBuffer or Uint8Array.
 *
 * @param {Uint8Array | ArrayBuffer} arrayBuffer - The input ArrayBuffer or Uint8Array.
 * @return {string | null} The MIME type of the input data, or null if it is not recognized.
 */
export function getMimeTypeFromArrayBuffer(
  /** @type {Uint8Array | ArrayBuffer} */ arrayBuffer
) {
  const uint8arr = new Uint8Array(arrayBuffer);

  const len = 12;
  if (uint8arr.length >= len) {
    const signatureArr = new Array(len);
    for (let i = 0; i < len; i++) signatureArr[i] = uint8arr[i].toString(16);
    const signature = signatureArr.join("").toUpperCase();

    switch (true) {
      // 89 50 4E 47 0D 0A 1A 0A
      case signature.startsWith("89504E47"):
        return "image/png";
      // 47 49 46 38 ?? 61
      case signature.startsWith("47494638"):
        return "image/gif";
      // FF D8 FF E0 ?? ??
      case signature.startsWith("FFD8FF"):
        return "image/jpeg";
      // 52 49 46 46 ?? ?? ?? ?? 57 45 42 50
      case signature.startsWith("52494646") && signature.includes("57454250"):
        return "image/webp";
      default:
        printErr(`Unknown file type. Signature: ${signature}`);
        return null;
    }
  }
  return null;
}

// https://stackoverflow.com/a/74236879

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

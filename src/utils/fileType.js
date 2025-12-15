
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
        // printErr(`Unknown file type. Signature: ${signature}`);
        return null;
    }
  }
  return null;
}

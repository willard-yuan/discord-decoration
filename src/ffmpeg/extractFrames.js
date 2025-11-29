import { getAPngDuration } from "@/utils/apng";
import { arraybuffer2base64, ffmpeg, ffmpegFetchAndConvert, runFfmpegCommand } from "./utils";

export function imagesFromGif(/** @type {String} */ gifUrl) {
  return new Promise((resolve, reject) => {
    (async () => {
      try {
        const {
          arrayBuffer: dataAB,
          data,
          type,
        } = await ffmpegFetchAndConvert(await (await fetch(gifUrl)).blob());
        if (type == null) return reject("Invalid image type");
        const ext = type.replace("image/", "");

        if (ext === "png") {
          const duration = getAPngDuration(dataAB);
          if (duration < 0) return resolve([arraybuffer2base64(dataAB)]);
        }
        ffmpeg.FS('writeFile', `image.${ext}`, data);
        try {
          for (const file of ffmpeg.FS('readdir', "extract").filter(
            (f) => f !== "." && f !== ".."
          )) {
            ffmpeg.FS('unlink', `extract/${file}`);
          }
          ffmpeg.FS('rmdir', "extract");
        } catch (e) { void e; }
        try {
          ffmpeg.FS('mkdir', "extract");
        } catch (e) { void e; }
        await runFfmpegCommand(
          "-i",
          `image.${ext}`,
          "-vsync",
          "0",
          "extract/frame_%d.png",
        );

        let frames = ffmpeg.FS('readdir', "extract")
          .filter((f) => f !== "." && f !== "..");
        frames = await Promise.all(
          frames.map(async (f) => {
            const res = ffmpeg.FS('readFile', `extract/${f}`);
            // @ts-ignore
            return arraybuffer2base64(res.buffer);
          })
        );
        resolve(frames);
      } catch (e) {
        console.log(e);
      }
    })();
  });
}

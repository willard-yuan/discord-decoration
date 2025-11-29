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
        await ffmpeg.writeFile(`image.${ext}`, data);
        try {
          const files = await ffmpeg.listDir("extract");
          for (const file of files) {
             if (file.name === "." || file.name === "..") continue;
             await ffmpeg.deleteFile(`extract/${file.name}`);
          }
          await ffmpeg.deleteDir("extract");
        } catch (e) { void e; }
        try {
          await ffmpeg.createDir("extract");
        } catch (e) { void e; }
        await runFfmpegCommand(
          "-i",
          `image.${ext}`,
          "-vsync",
          "0",
          "extract/frame_%d.png",
        );

        let frames = await ffmpeg.listDir("extract");
        frames = frames.filter((f) => f.name !== "." && f.name !== "..");
        
        // Sort frames manually because readdir order is not guaranteed
        frames.sort((a, b) => {
             const numA = parseInt(a.name.match(/\d+/)?.[0] || "0");
             const numB = parseInt(b.name.match(/\d+/)?.[0] || "0");
             return numA - numB;
        });

        const resultFrames = await Promise.all(
          frames.map(async (f) => {
            const res = await ffmpeg.readFile(`extract/${f.name}`);
            // @ts-ignore
            return arraybuffer2base64(res.buffer || res);
          })
        );
        resolve(resultFrames);
      } catch (e) {
        console.log(e);
        reject(e);
      }
    })();
  });
}

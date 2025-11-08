import { useCallback, useEffect, useRef, useState } from "react";
import JSZip from "jszip";

import FileUpload from "@/components/fileupload.jsx";
import { Icons } from "@/components/icons.jsx";
import Image from "@/components/image.jsx";
import Navbar from "@/components/Navbar.jsx";
import Footer from "@/components/Footer.jsx";

import { imagesFromGif } from "@/ffmpeg/extractFrames.js";
import {
  getMimeTypeFromArrayBuffer,
  initFfmpeg,
  setFfmpeg,
} from "@/ffmpeg/utils.js";

import { printErr, printMsg } from "@/utils/print.js";
import { clearData, getData, storeData } from "@/utils/dataHandler.js";
import { ffmpegTotalBytes } from "@/data/fileSizes.js";

const isServer = typeof window === "undefined";

export default function GifExtractor() {
  useEffect(() => {
    document.title = "GIF Frame Extractor - Extract Frames from Animated GIFs";
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Free online GIF frame extractor tool. Extract individual frames from animated GIFs quickly and easily. Perfect for creating Discord avatars, profile pictures, and image editing projects.');
    }
    
    // Set meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'Free Animated GIF Frame Extractor, GIF Frame Extractor, Split GIF Image into Frames');
    
    // Set meta robots
    let metaRobots = document.querySelector('meta[name="robots"]');
    if (!metaRobots) {
      metaRobots = document.createElement('meta');
      metaRobots.setAttribute('name', 'robots');
      document.head.appendChild(metaRobots);
    }
    metaRobots.setAttribute('content', 'index, follow');
    
    // Add structured data for SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "GIF Frame Extractor",
      "description": "Free online tool to extract individual frames from animated GIFs",
      "url": "https://discord-decoration.art/gif-extractor",
      "applicationCategory": "MultimediaApplication",
      "operatingSystem": "Web Browser",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "author": {
        "@type": "Organization",
        "name": "Discord Decoration"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Discord Decoration",
        "logo": {
          "@type": "ImageObject",
          "url": "https://discord-decoration.art/banner.svg"
        }
      }
    };
    
    // Remove existing structured data script if any
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }
    
    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
    
    return () => {
      // Cleanup structured data on unmount
      const scriptToRemove = document.querySelector('script[type="application/ld+json"]');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, []);

  const [loaded, setLoaded] = useState(true);
  const [loadPercentage, setLoadPercentage] = useState("0%");
  const ffmpegRef = useRef(null);

  // 按需初始化 FFmpeg，并显示进度条
  const ensureLoaded = useCallback(async () => {
    if (isServer) return;

    const existing = getData("ffmpeg");
    if (existing) {
      ffmpegRef.current = existing;
      setFfmpeg(ffmpegRef.current);
      return;
    }

    setLoaded(false);
    const { FFmpeg } = await import("@ffmpeg/ffmpeg");
    ffmpegRef.current = new FFmpeg();
    setFfmpeg(ffmpegRef.current);
    await initFfmpeg((e) => {
      setLoadPercentage(`${Math.round((e.received / ffmpegTotalBytes) * 100)}%`);
    });
    setLoaded(true);
  }, []);

  // 仅在挂载时恢复传递的图片数据，不初始化 FFmpeg
  useEffect(() => {
    if (!isServer) {
      const i = getData("image");
      if (i) setFile(i);
      clearData("image");
    }
  }, []);

  const [file, setFile] = useState(null);
  const [frames, setFrames] = useState(null);
  const [zipping, setZipping] = useState(false);

  const base64ToUint8Array = (base64) => {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  };

  const downloadAllFrames = async () => {
    if (!frames || !frames.length) return;
    setZipping(true);
    try {
      const zip = new JSZip();
      frames.forEach((frame, i) => {
        const filename = `frame_${String(i + 1).padStart(3, "0")}.png`;
        zip.file(filename, base64ToUint8Array(frame));
      });
      const blob = await zip.generateAsync({ type: "blob" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `gif_frames_${Date.now()}.zip`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      printErr("Failed to create ZIP");
      console.error(err);
    } finally {
      setZipping(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-text">
      <Navbar />
      
      {loaded ? (
        <>
          <main className="min-h-screen bg-gradient-to-br from-surface-overlay via-surface-high/30 to-surface-overlay">
            {/* Hero Section */}
            <div className="container-responsive py-16">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold ginto bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent mb-4">
                  GIF Frame Extractor
                </h1>
                <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto">
                  Extract individual frames from animated GIFs quickly and easily. Perfect for creating Discord avatars and profile pictures.
                </p>
              </div>

              {file == null ? (
                /* Upload Section */
                <div className="max-w-2xl mx-auto">
                  <div className="bg-surface-overlay/50 backdrop-blur-sm rounded-2xl p-8 border border-border-faint hover:border-border-normal transition-all duration-300">
                    <div className="text-center">
                      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-text-primary mb-2">Upload Your GIF</h3>
                      <p className="text-text-secondary mb-6">
                        Choose a GIF file to extract frames from
                      </p>
                      
                      <button
                        className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-purple-500 hover:from-primary/80 hover:to-purple-500/80 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                        onClick={() => {
                          document.getElementById("upload-gif").click();
                        }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        Choose GIF File
                      </button>
                      
                      <input
                        type="file"
                        id="upload-gif"
                        className="hidden"
                        accept="image/png, image/gif, image/webp"
                        onChange={(e) => {
                          // @ts-ignore
                          const [file] = e.target.files;
                          if (file) {
                            const reader = new FileReader();
                            reader.readAsDataURL(file);
                            reader.onload = () => {
                              setFile(reader.result);
                            };
                          }
                        }}
                      />
                      
                      <div className="mt-6 p-4 bg-surface-high/30 rounded-xl border border-border-faint">
                        <p className="text-text-secondary text-sm flex items-center justify-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          You can also drag and drop a GIF file here
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Processing Section */
                <div className="max-w-4xl mx-auto space-y-8">
                  {/* GIF Preview Card */}
                  <div className="bg-surface-overlay/50 backdrop-blur-sm rounded-2xl p-8 border border-border-faint">
                    <div className="flex flex-col items-center">
                      <div className="relative group">
                        <button
                           className="absolute -top-2 -right-2 z-10 bg-critical hover:bg-critical/80 text-white p-2 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110"
                           onClick={() => {
                             setFile(null);
                             setFrames(null);
                           }}
                         >
                           <Icons.delete />
                         </button>
                        
                        <div className="bg-gradient-to-br from-surface-high to-surface-higher p-4 rounded-xl">
                          <Image
                            src={file}
                            className="rounded-lg max-w-full max-h-80 shadow-lg"
                            draggable="false"
                          />
                        </div>
                      </div>
                      
                      <div className="mt-6 text-center">
                        <h3 className="text-xl font-semibold text-text-primary mb-2">Ready to Extract</h3>
                        <p className="text-text-secondary mb-6">
                          Click the button below to extract all frames from your GIF
                        </p>
                        
                        <button
                          className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-success to-green-500 hover:from-success/80 hover:to-green-500/80 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                          onClick={async () => {
                            await ensureLoaded();
                            setFrames(await imagesFromGif(file));
                          }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Extract Frames
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Frames Grid */}
                  {frames && typeof frames === "object" && typeof frames.map === "function" && (
                    <div className="bg-surface-overlay/50 backdrop-blur-sm rounded-2xl p-8 border border-border-faint">
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-semibold text-text-primary mb-2">Extracted Frames</h3>
                        <p className="text-text-secondary">Click on any frame to download it as a PNG file, or scroll to the bottom to download all frames (.zip) with one click.</p>
                      </div>
                      
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {frames.map((frame, i) => (
                          <button
                            key={i}
                            className="group relative bg-surface-high hover:bg-surface-higher p-3 rounded-xl border border-border-faint hover:border-border-normal transition-all duration-300 transform hover:scale-105 hover:shadow-lg aspect-square"
                            onClick={() => {
                              const a = document.createElement("a");
                              a.href = `data:image/png;base64,${frame}`;
                              a.download = `frame_${i + 1}_${Date.now()}.png`;
                              a.click();
                            }}
                          >
                            <img
                              alt={`Frame ${i + 1}`}
                              src={`data:image/png;base64,${frame}`}
                              className="w-full h-full object-cover rounded-lg"
                              draggable={false}
                            />
                            
                            {/* Download overlay */}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl flex items-center justify-center">
                              <div className="text-white text-center">
                                <svg className="w-6 h-6 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span className="text-xs font-medium">Download</span>
                              </div>
                            </div>
                            
                            {/* Frame number */}
                            <div className="absolute top-1 left-1 bg-black/70 text-white text-xs px-2 py-1 rounded">
                              #{i + 1}
                            </div>
                          </button>
                        ))}
                      </div>
                      
                      <div className="mt-8 text-center">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-high rounded-lg border border-border-faint">
                          <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-text-secondary text-sm">
                            {frames.length} frames extracted successfully
                          </span>
                        </div>
                      </div>

                      {/* Bulk download button moved to bottom */}
                      <div className="mt-8 flex justify-center">
                        <button
                          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-purple-500 hover:from-primary/80 hover:to-purple-500/80 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
                          onClick={downloadAllFrames}
                          disabled={zipping || !frames?.length}
                          aria-label="Download all frames as a ZIP"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          {zipping ? "Preparing ZIP…" : "Download All Frames (.zip)"}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </main>
          <FileUpload
            onUpload={async (e) => {
              const file = e.dataTransfer.files.item(0);
              if (
                !["image/png", "image/gif", "image/webp"].includes(file.type)
              ) {
                printErr(
                  `Expected image/png, image/gif, or image/webp. Got ${file.type}`
                );
                throw printErr("Invalid file type");
              }
              const ab = await file.arrayBuffer();
              if (
                !["image/png", "image/gif", "image/webp"].includes(
                  getMimeTypeFromArrayBuffer(ab)
                )
              ) {
                throw printErr("Invalid image file");
              }
              const reader = new FileReader();
              reader.readAsDataURL(new Blob([ab]));
              reader.onload = () => {
                setFile(reader.result);
              };
            }}
          />
        </>
      ) : (
        <main className="flex flex-col justify-center items-center p-8 w-full h-screen text-white">
          <p className="top-8 absolute mx-8 max-w-xl font-bold text-4xl text-center ginto">
            Discord
            <br />
            FAKE AVATAR DECORATIONS
            <br />
            <br />
            <span className="text-gray-300 text-3xl ginto">
              Gif Frame Extractor
            </span>
          </p>
          <div className="relative bg-surface-higher rounded-full w-[calc(100vw-3rem)] max-w-84 h-8 overflow-clip">
            <div
              style={{
                width: loadPercentage,
              }}
              className="bg-primary h-full"
            />
            <div className="top-0 right-0 bottom-0 left-0 absolute flex justify-center items-center">
              <p className="text-xl text-center ginto">{loadPercentage}</p>
            </div>
          </div>
        </main>
      )}
      
      <Footer />
    </div>
  );
}

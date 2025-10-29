import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "preact/hooks";

import FileUpload from "@/components/fileupload.jsx";
import { Icons } from "@/components/icons.jsx";
import Image from "@/components/image.jsx";
import Modal from "@/components/modal.jsx";
import { LoadingCubes } from "@/components/spinner.jsx";
import Twemoji from "@/components/twemoji.jsx";

import { FFmpeg } from "@ffmpeg/ffmpeg";
import { addDecoration, cropToSquare } from "@/ffmpeg/processImage.js";
import {
  getMimeTypeFromArrayBuffer,
  initFfmpeg,
  setFfmpeg,
} from "@/ffmpeg/utils.js";

import { printErr } from "@/utils/print.js";
import { getData, storeData } from "@/utils/dataHandler.js";

import { decorationsData } from "@/data/decorations.js";
import { avatarsData } from "@/data/avatars.js";

import SearchBar from "@/components/searchbar.jsx";
import { Svg } from "@/components/svg.jsx";
import { useLocation } from "preact-iso";
import { NeutralButton } from "@/components/button";
import { Fragment } from "preact/jsx-runtime";
import { createContext } from "preact";
import Navbar from "@/components/Navbar.jsx";
import Hero from "@/components/Hero.jsx";
import Footer from "@/components/Footer.jsx";
import Breadcrumb from "@/components/Breadcrumb.jsx";
import HowToCreate from "@/components/HowToCreate.jsx";
import Testimonials from "@/components/Testimonials.jsx";

const baseImgUrl = import.meta.env.VITE_BASE_IMAGE_URL || "";

const isServer = typeof window === "undefined";

let loadingPromise = null;

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  const [unsupported, setUnsupported] = useState("");

  const transferredFfmpeg = getData("ffmpeg");
  const ffmpegRef = useRef(isServer ? null : transferredFfmpeg || new FFmpeg());

  const ensureLoaded = useCallback(async () => {
    if (loaded) return;
    if (loadingPromise != null) {
      await loadingPromise;
      return;
    }
    throw new Error("FFmpeg initialization not queued.");
  }, []);

  const load = useCallback(async () => {
    if (isServer) return;

    if (typeof WebAssembly === "undefined") {
      setUnsupported("Your browser does not support WebAssembly.");
    }

    if (!transferredFfmpeg) {
      setFfmpeg(ffmpegRef.current);

      loadingPromise = initFfmpeg();
      await loadingPromise;
    }

    setLoaded(true);
  }, []);

  const [t, setT] = useState(false);
  useEffect(() => {
    if (t) return;
    setT(true);
    load();
  }, [load, t]);

  return (
    <>
      <App ensureLoaded={ensureLoaded} />
      <UnsupportedModal unsupportedMsg={unsupported} />
    </>
  );
}

const UnsupportedModal = ({ unsupportedMsg }) =>
  unsupportedMsg && (
    <Modal visible={true} hideActions={true}>
      <div className="flex flex-col justify-between items-stretch bg-critical/20 p-4 border-2 border-critical border-dashed rounded-xl grow">
        <div>
          <p className="text-2xl text-center ginto">Error</p>
          <p className="text-center">{unsupportedMsg}</p>
        </div>
        <NeutralButton
          onClick={() => {
            window.open(
              "https://github.com/ItsPi3141/discord-fake-avatar-decorations/issues"
            );
          }}
        >
          <Icons.bug />
          Report a bug
        </NeutralButton>
      </div>
    </Modal>
  );

const BuyMeCoffeeButton = () => {
  return (
    <a
      href="https://www.buymeacoffee.com/yong1024"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center px-4 py-2 w-72 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
      style={{
        backgroundColor: '#FFDD00',
        color: '#000000',
        border: '1px solid #000000',
        fontFamily: 'Cookie, cursive',
        fontSize: '18px',
        fontWeight: 'normal'
      }}
    >
      <span className="mr-2" style={{ fontSize: '16px' }}>☕</span>
      Buy me a coffee
    </a>
  );
};

const CurrentData = createContext(null);

const ExtraLinks = () => (
  <>
    {/* share with friends */}
    <div className="flex flex-col justify-start items-stretch p-4 rounded-lg w-full text-center select-none highlight">
      <div className="flex items-center justify-center gap-3 mb-1">
        <span className="text-primary opacity-80">
          <Icons.megaphone size="1.1em" />
        </span>
        <p className="text-lg font-medium">Share with your friends</p>
        <span className="text-primary opacity-80">
          <Icons.megaphone size="1.1em" />
        </span>
      </div>
      <NeutralButton
        onClick={() => {
          const url = encodeURIComponent(window.location.href);
          const text = encodeURIComponent(
            "Check out this awesome Discord Avatar Decorations tool!"
          );
          window.open(
            `https://twitter.com/intent/tweet?url=${url}&text=${text}`
          );
        }}
      >
        <Icons.x />
        Share on X
      </NeutralButton>
      <NeutralButton
        onClick={() => {
          const url = encodeURIComponent(window.location.href);
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
        }}
      >
        <Icons.facebook />
        Share on Facebook
      </NeutralButton>
      <NeutralButton
        onClick={() => {
          const url = encodeURIComponent(window.location.href);
          const title = encodeURIComponent("Discord Avatar Decorations Tool");
          window.open(
            `https://www.reddit.com/submit?url=${url}&title=${title}`
          );
        }}
      >
        <Icons.reddit />
        Share on Reddit
      </NeutralButton>
      <NeutralButton
        onClick={() => {
          const url = encodeURIComponent(window.location.href);
          const title = encodeURIComponent("Discord Avatar Decorations Tool");
          const summary = encodeURIComponent(
            "Check out this awesome tool for Discord avatar decorations!"
          );
          window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}&summary=${summary}`
          );
        }}
      >
        <Icons.linkedin />
        Share on LinkedIn
      </NeutralButton>
    </div>

    {/* Links */}
    <div className="flex flex-col justify-start items-stretch rounded-lg w-full font-medium select-none">
      <p className="font-bold">Links</p>
      <a
        className="flex justify-start items-center gap-2 mt-3 p-2 button-outline"
        href="/gif-extractor"
      >
        <span className="place-items-center w-6">
          <Icons.gif size="18px" />
        </span>
        GIF Frame Extractor
        <span className="grow" />
        <span className="rotate-45">
          <Icons.up size="16px" />
        </span>
      </a>
      <a
        className="flex justify-start items-center gap-2 mt-3 p-2 button-outline"
        href="/discord_avatar"
      >
        <span className="place-items-center w-6">
          <Icons.image size="18px" />
        </span>
        Discord Avatar Gallery
        <span className="grow" />
        <span className="rotate-45">
          <Icons.up size="16px" />
        </span>
      </a>
      <a
        className="flex justify-start items-center gap-2 mt-3 p-2 button-outline"
        href="/discord_avatar_decoration"
      >
        <span className="place-items-center w-6">
          <Icons.star size="18px" />
        </span>
        Discord Avatar Decorations Gallery
        <span className="grow" />
        <span className="rotate-45">
          <Icons.up size="16px" />
        </span>
      </a>
      <a
        className="flex justify-start items-center gap-2 mt-3 p-2 button-outline"
        href="https://emojitoimage.com/"
        target="_blank"
        rel="noreferrer"
      >
        <span className="place-items-center w-6">
          <Icons.emojitoimage size="18px" />
        </span>
        Emoji to Image Converter
        <span className="grow" />
        <span className="rotate-45">
          <Icons.up size="16px" />
        </span>
      </a>
      <a
        className="flex justify-start items-center gap-2 mt-3 p-2 button-outline"
        href="https://emojiface.us/"
        target="_blank"
        rel="noreferrer"
      >
        <span className="place-items-center w-6">
          <Icons.emojiface size="18px" />
        </span>
        Mask Face with Emoji
        <span className="grow" />
        <span className="rotate-45">
          <Icons.up size="16px" />
        </span>
      </a>
    </div>
  </>
);

const App = ({ ensureLoaded }) => {
  // Set page title for homepage
  useEffect(() => {
    document.title = "Discord Decoration - Free Avatar Decorations for Discord.";
  }, []);

  // @ts-ignore
  const previewAvatar = useCallback(async (url) => {
    if (isServer) return;
    await ensureLoaded();
    setAvUrl("loading");
    const res = await cropToSquare(url).catch((reason) => printErr(reason));
    if (!res) return setAvUrl(null);
    setAvUrl(res);
  });

  // @ts-ignore
  const createAvatar = useCallback(async (url, deco) => {
    if (isServer) return;
    await ensureLoaded();
    addDecoration(url, deco === "" ? "" : `${baseImgUrl}${deco}`)
      .then((res) => {
        if (!res) {
          setFinishedAv(null);
          setGenerationFailed(true);
          return;
        }
        setFinishedAv(res);
        setIsGeneratingAv(false);
      })
      .catch((reason) => {
        setGenerationFailed(true);
        setIsGeneratingAv(false);
        printErr(reason);
      });
  });

  const [avatarName, setAvatarName] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [decoUrl, setDecoUrl] = useState("/decorations/treat_pumpkin.png");
  const [avUrl, setAvUrl] = useState("");

  const [finishedAv, setFinishedAv] = useState("");
  const [isGeneratingAv, setIsGeneratingAv] = useState(false);
  const [generationFailed, setGenerationFailed] = useState(false);
  const [downloadModalVisible, setDownloadModalVisible] = useState(false);

  const [shared, setShared] = useState(false);

  const [avatarSearch, setAvatarSearch] = useState("");
  const [decoSearch, setDecoSearch] = useState("");

  const router = useLocation();

  // @ts-ignore
  const getBannerImage = useCallback(() => {
    switch (new Date().getMonth() + 1) {
      case 2:
        return `url(${baseImgUrl}/banners/hearts.png) right top / contain no-repeat, linear-gradient(78.98deg, rgba(221, 98, 98, 1), rgba(171, 12, 152, 1))`;
      case 12:
        return `url(${baseImgUrl}/wallpaper/winter.jpg) center / cover no-repeat`;
      default:
        return "none";
    }
  }, []);

  const clearSelectedAvatar = useCallback(() => {
    for (const el of document.querySelectorAll(
      "button.avatar-preset.border-primary"
    )) {
      el.classList.remove("border-primary");
    }
  }, []);

  return (
    <CurrentData.Provider
      value={{
        avatarsData,
        avatarSearch,
        setAvatarName,
        setAvUrl,

        decorationsData,
        decoSearch,
        setName,
        setDescription,
        setDecoUrl,
        name,
      }}
    >
      <Navbar />
      <Breadcrumb />
      <Hero />
      <main className="flex flex-col items-center w-screen min-h-screen overflow-auto text-text-primary discord-scrollbar bg-surface-overlay">
        <div className="flex md:flex-row flex-col items-center md:items-start gap-8 px-8 py-12 w-full max-w-[900px] relative z-10">
          {/* SETTINGS */}
          <div
            id="settings"
            className="block w-full md:w-auto select-none grow order-2 md:order-1"
          >
            {/* UPLOAD AVATAR */}
            <h3 className="my-2 font-semibold text-gray-300 text-lg scale-y-90 [letter-spacing:.05em]">
              DISCORD AVATAR UPLOAD
            </h3>
            <div className="flex sm:flex-row flex-col sm:items-center gap-3">
              <button
                className="px-4 py-1.5 button-primary"
                onClick={() => {
                  document.getElementById("upload-avatar").click();
                }}
                aria-label="Upload avatar image"
              >
                <input
                  type="file"
                  id="upload-avatar"
                  className="hidden"
                  accept="image/png, image/jpeg, image/gif, image/webp"
                  aria-label="Choose avatar image file"
                  onChange={(e) => {
                    // @ts-ignore
                    const [file] = e.target.files;
                    if (file) {
                      const reader = new FileReader();
                      reader.readAsDataURL(file);
                      reader.onload = () => {
                        previewAvatar(reader.result);
                        clearSelectedAvatar();
                      };
                    }
                  }}
                />
                Upload image
              </button>
              <p className="sm:text-left text-center">or</p>
              <input
                type="text"
                className="text-input grow"
                placeholder="Enter image URL..."
                aria-label="Enter avatar image URL"
                onChange={async (e) => {
                  setAvatarName("");
                  // @ts-ignore
                  const res = await fetch(e.target.value);
                  if (res.status < 200 || res.status >= 400)
                    return setAvUrl(null);
                  const blob = await res.blob();
                  if (
                    ![
                      "image/png",
                      "image/jpeg",
                      "image/gif",
                      "image/webp",
                    ].includes(blob.type)
                  )
                    return setAvUrl(null);
                  const reader = new FileReader();
                  reader.readAsDataURL(blob);
                  reader.onload = () => {
                    previewAvatar(reader.result);
                    clearSelectedAvatar();
                  };
                }}
              />
            </div>
            <p className="mt-4 mb-2">
              You can also pick from one of these avatars below
            </p>
            <SearchBar
              placeholder={"Search avatars..."}
              onValueChanged={setAvatarSearch}
            />
            {/* SELECT AVATAR */}
            <div className="flex flex-col gap-8 mt-1 py-1 h-[280px] overflow-auto discord-scrollbar">
              <AvatarList />
            </div>
            <hr className="border-b border-border-faint/10" />

            {/* SELECT DECORATION */}
            <h3 className="my-2 font-semibold text-gray-300 text-lg scale-y-90 [letter-spacing:.05em]">
              DISCORD AVATAR DECORATION
            </h3>
            <p className="mb-3 text-white text-sm">
              You can pick from one of these discord avatar decorations below
            </p>
            <SearchBar
              placeholder={"Search decorations..."}
              onValueChanged={setDecoSearch}
            />

            <DecorationsTabs />
          </div>

          <div className="sticky top-0 z-20 flex flex-col items-center gap-8 order-1 md:order-2 md:top-12 bg-surface-overlay py-4">
            {/* PROFILE PREVIEW */}
            <div
              id="profile-preview"
              className="relative bg-surface-overlay shadow-lg rounded-lg w-[300px] overflow-hidden select-none"
            >
              <div className="bg-primary h-[105px]" />
              <div className="top-[61px] left-[16px] absolute bg-surface-overlay p-[6px] rounded-full w-[92px] h-[92px] select-none">
                <div className="relative rounded-full w-[80px] h-[80px] overflow-hidden">
                  {avUrl === "loading" ? (
                    <div className="top-[24px] left-[24px] absolute">
                      <LoadingCubes />
                    </div>
                  ) : (
                    <>
                      <Image
                        id="avatar"
                        src={avUrl || `${baseImgUrl}/avatars/in_rainbows.png`}
                        className={
                          "absolute top-[calc(80px*0.09)] left-[calc(80px*0.09)] w-[calc(80px*0.82)] h-[calc(80px*0.82)] rounded-full"
                        }
                        draggable={false}
                      />
                      <Image
                        id="decoration"
                        src={decoUrl}
                        className="top-0 left-0 absolute"
                        draggable={false}
                      />
                    </>
                  )}
                </div>
                <div className="right-[-4px] bottom-[-4px] absolute bg-[#229f56] border-[5px] border-surface-overlay rounded-full w-7 h-7" />
              </div>
              <div className="bg-surface-overlay mt-[35px] p-4 rounded-lg w-[calc(100%)] *:w-full">
                <p className="font-semibold text-xl [letter-spacing:.02em]">
                  {name || "Display Name"}
                </p>
                <p className="mb-3 text-sm">{avatarName || "username"}</p>
                <p className="text-sm mb-6">
                  {description ||
                    "This is an example profile so that you can see what the profile picture would actually look like on Discord."}
                </p>
                <button
                  onClick={() => {
                    setFinishedAv("");
                    setIsGeneratingAv(true);
                    setGenerationFailed(false);
                    setDownloadModalVisible(true);
                    createAvatar(
                      avUrl || `${baseImgUrl}/avatars/in_rainbows.png`,
                      decoUrl
                    );
                  }}
                  className="group relative inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary via-purple-600 to-pink-600 hover:from-primary/90 hover:via-purple-600/90 hover:to-pink-600/90 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-primary/30 overflow-hidden"
                >
                  {/* 背景光效 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-pink-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                  
                  {/* 闪烁效果 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  
                  {/* 内容 */}
                  <div className="relative flex items-center gap-3">
                    <div className="p-1 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors duration-300">
                      <Icons.image />
                    </div>
                    <span className="font-bold">Save Avatar</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
            {/* Message preview */}
            <div className="bg-base-lower py-4 border border-border-faint rounded-lg w-[300px] cursor-default select-none">
              {[
                {
                  styled: false,
                  groupStart: true,
                  text: "Look at me I'm a beautiful butterfly",
                },
                {
                  styled: false,
                  groupStart: false,
                  text: (
                    <>
                      Fluttering in the moonlight <Twemoji emoji={"1f31d"} />
                    </>
                  ),
                },
                {
                  styled: false,
                  groupStart: false,
                  text: "Waiting for the day when",
                },
                {
                  styled: false,
                  groupStart: false,
                  text: "I get an avatar decoration",
                },
                {
                  styled: true,
                  groupStart: true,
                  text: (
                    <>
                      {decoUrl ? (
                        <>
                          Yay! Here it is! <Twemoji emoji={"1f389"} />
                        </>
                      ) : (
                        <>
                          Hmm... I still don't see it{" "}
                          <Twemoji emoji={"1f914"} />
                        </>
                      )}
                    </>
                  ),
                },
              ].map((m, i) => {
                return (
                  <div
                    className="flex items-center gap-4 hover:bg-base-lowest px-4 py-0.5"
                    style={{
                      marginTop: m.groupStart && i !== 0 ? "17px" : "0",
                    }}
                    key={i}
                  >
                    {m.groupStart &&
                      (avUrl === "loading" ? (
                        <div className="relative w-10 h-10 scale-75 shrink-0">
                          <LoadingCubes />
                        </div>
                      ) : (
                        <>
                          {m.styled ? (
                            <div className="relative rounded-full w-10 h-10 overflow-hidden shrink-0">
                              <Image
                                src={avUrl || `${baseImgUrl}/avatars/in_rainbows.png`}
                                draggable={false}
                                width={32.8}
                                height={32.8}
                                className="top-[3.6px] left-[3.6px] absolute rounded-full"
                              />
                              {decoUrl && (
                                <Image
                                  src={decoUrl}
                                  draggable={false}
                                  width={40}
                                  height={40}
                                  className="top-0 left-0 absolute"
                                />
                              )}
                            </div>
                          ) : (
                            <Image
                              src={avUrl || `${baseImgUrl}/avatars/in_rainbows.png`}
                              draggable={false}
                              className="rounded-full w-10 h-10 shrink-0"
                            />
                          )}
                        </>
                      ))}
                    <div className="flex flex-col overflow-hidden shrink">
                      {m.groupStart && (
                        <p className="flex items-center gap-2 max-w-[250px] h-fit font-medium text-base">
                          <span className="overflow-hidden text-ellipsis text-nowrap">
                            {name || "Display Name"}
                          </span>
                          <span className="h-4 text-text-muted text-xs text-nowrap">
                            {!isServer &&
                              `Today at ${
                                [
                                  (new Date().getHours() % 12).toString(),
                                  new Date()
                                    .getMinutes()
                                    .toString()
                                    .padStart(2, "0"),
                                ].join(":") +
                                (new Date().getHours() >= 12 ? " PM" : " AM")
                              }`}
                          </span>
                        </p>
                      )}

                      <p
                        style={{
                          marginLeft: m.groupStart ? "0" : "56px",
                          lineHeight: "22px",
                        }}
                      >
                        {m.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="hidden md:flex flex-col gap-4">
              <ExtraLinks />
            </div>
          </div>
        </div>
        <div className="md:hidden">
          <ExtraLinks />
        </div>
      </main>
      <Modal
        title={"Save Decorated Avatar"}
        subtitle={
          isGeneratingAv
            ? "Please wait while the image is being generated."
            : "You can save the image below. You may need to extract a still frame from the image if you do not have an active Nitro subscription."
        }
        visible={downloadModalVisible}
        onClose={() => {
          setDownloadModalVisible(false);
        }}
      >
        {isGeneratingAv ? (
          <div className="flex flex-col justify-center items-center gap-4 grow">
            <LoadingCubes />
            <p>Creating image...</p>
          </div>
        ) : generationFailed ? (
          <div className="flex flex-col justify-center items-center gap-4 grow">
            <p className="text-red-400 text-center">
              Failed to generate image
              <br />
              Please try again.
            </p>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-4 grow">
            <Image
              src={finishedAv}
              draggable={false}
              width={128}
              height={128}
            />
            <div className="flex flex-col w-full">
              <div className="flex flex-col items-center gap-3 mt-3 *:mt-0 w-full *:w-72">
                <NeutralButton
                  onClick={() => {
                    const a = document.createElement("a");
                    a.href = finishedAv;
                    a.download = `discord_avatar_decoration_animated_${Date.now()}.gif`;
                    a.click();
                  }}
                  ariaLabel="Download decorated avatar as animated GIF"
                >
                  <Icons.download />
                  Save Animated GIF
                </NeutralButton>
                <NeutralButton
                  onClick={() => {
                    if (isServer) return;
                    storeData("image", finishedAv);
                    router.route("/gif-extractor");
                  }}
                >
                  <Icons.image />
                  Extract still image
                </NeutralButton>
                {/* Buy me a coffee button */}
                <BuyMeCoffeeButton />
              </div>
            </div>
          </div>
        )}
      </Modal>
      <FileUpload
        onUpload={async (e) => {
          const file = e.dataTransfer.files.item(0);
          if (
            !["image/png", "image/jpeg", "image/gif", "image/webp"].includes(
              file.type
            )
          ) {
            printErr(
              `Expected image/png, image/jpeg, image/gif, or image/webp. Got ${file.type}`
            );
            throw printErr("Invalid file type");
          }
          const ab = await file.arrayBuffer();
          if (getMimeTypeFromArrayBuffer(ab) == null) {
            throw printErr("Invalid image file");
          }
          const reader = new FileReader();
          reader.readAsDataURL(new Blob([ab]));
          reader.onload = () => {
            previewAvatar(reader.result);
            clearSelectedAvatar();
          };
        }}
      />
      <HowToCreate />
      <Testimonials />
      <Footer />
    </CurrentData.Provider>
  );
};

export const NoSearchResults = ({ thing }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 text-text-muted grow">
      <Svg.NoSearchResults size="140" />
      <p className="text-center">No {thing} found</p>
    </div>
  );
};

const AvatarList = () => {
  const { avatarsData, avatarSearch, setAvatarName, setAvUrl } =
    useContext(CurrentData);

  // Categorize avatars based on their names and themes
  const categorizeAvatars = useCallback(() => {
    const categories = {
      'Colors & Themes': [],
      'Gaming & Entertainment': [],
      'Characters & Mascots': [],
      'Seasonal & Events': [],
      'Fantasy & Sci-Fi': [],
      'Animals & Creatures': [],
      'Other': []
    };

    avatarsData.forEach(avatar => {
      const name = avatar.n.toLowerCase();
      
      // Colors & Themes
      if (name.includes('blue') || name.includes('red') || name.includes('green') || 
          name.includes('yellow') || name.includes('pink') || name.includes('gray') ||
          name.includes('blurple') || name.includes('color') || name.includes('classic') ||
          name.includes('pastel') || name.includes('holo') || name.includes('prismatic') ||
          name.includes('rainbow') || name.includes('midnight') || name.includes('galactic')) {
        categories['Colors & Themes'].push(avatar);
      }
      // Gaming & Entertainment
      else if (name.includes('valorant') || name.includes('street fighter') || name.includes('palworld') || 
          name.includes('arcade') || name.includes('gaming') || name.includes('dungeons') || 
          name.includes('magic') || name.includes('star wars') || name.includes('civilization') ||
          name.includes('dojo') || name.includes('ggez')) {
        categories['Gaming & Entertainment'].push(avatar);
      }
      // Characters & Mascots (Wumpus, Clyde, etc.)
      else if (name.includes('wumpus') || name.includes('clyde') || name.includes('mascot') ||
               name.includes('character') || name.includes('bot') || name.includes('helper') ||
               name.includes('assistant') || name.includes('guide') || name.includes('buddy') ||
               name.includes('pal') || name.includes('friend') || name.includes('companion')) {
        categories['Characters & Mascots'].push(avatar);
      }
      // Seasonal & Events
      else if (name.includes('halloween') || name.includes('christmas') || name.includes('winter') ||
               name.includes('spring') || name.includes('summer') || name.includes('fall') ||
               name.includes('autumn') || name.includes('holiday') || name.includes('seasonal') ||
               name.includes('valentine') || name.includes('easter') || name.includes('thanksgiving') ||
               name.includes('new year') || name.includes('birthday') || name.includes('celebration') ||
               name.includes('sakura') || name.includes('snow') || name.includes('beach')) {
        categories['Seasonal & Events'].push(avatar);
      }
      // Fantasy & Sci-Fi
      else if (name.includes('dragon') || name.includes('wizard') || name.includes('magic') ||
               name.includes('fantasy') || name.includes('medieval') || name.includes('knight') ||
               name.includes('castle') || name.includes('sword') || name.includes('shield') ||
               name.includes('space') || name.includes('alien') || name.includes('robot') ||
               name.includes('cyber') || name.includes('tech') || name.includes('future') ||
               name.includes('galaxy') || name.includes('star') || name.includes('planet')) {
        categories['Fantasy & Sci-Fi'].push(avatar);
      }
      // Animals & Creatures
      else if (name.includes('cat') || name.includes('dog') || name.includes('bird') ||
               name.includes('fish') || name.includes('bear') || name.includes('wolf') ||
               name.includes('fox') || name.includes('rabbit') || name.includes('mouse') ||
               name.includes('lion') || name.includes('tiger') || name.includes('elephant') ||
               name.includes('monkey') || name.includes('panda') || name.includes('koala') ||
               name.includes('penguin') || name.includes('owl') || name.includes('eagle') ||
               name.includes('snake') || name.includes('turtle') || name.includes('frog') ||
               name.includes('bee') || name.includes('butterfly') || name.includes('spider') ||
               name.includes('creature') || name.includes('animal') || name.includes('pet')) {
        categories['Animals & Creatures'].push(avatar);
      }
      // Everything else goes to Other
      else {
        categories['Other'].push(avatar);
      }
    });

    return categories;
  }, [avatarsData]);

  const getAvatars = useCallback(() => {
    if (isServer) return [];
    
    const categories = categorizeAvatars();
    let filteredAvatars = [];
    
    // If there's a search query, filter across all categories
    if (avatarSearch.trim()) {
      Object.values(categories).forEach(categoryAvatars => {
        const filtered = categoryAvatars.filter((avatar) =>
          avatar.n.toLowerCase().includes(avatarSearch.toLowerCase())
        );
        filteredAvatars.push(...filtered);
      });
    } else {
      // If no search, return avatars in category order
      Object.values(categories).forEach(categoryAvatars => {
        filteredAvatars.push(...categoryAvatars);
      });
    }
    
    return filteredAvatars;
  }, [avatarsData, avatarSearch, categorizeAvatars]);

  const onSelectAvatar = useCallback((event, name, file) => {
    setAvatarName(name.toLowerCase());
    setAvUrl(`${baseImgUrl}/avatars/${file}`);
    for (const el of document.querySelectorAll(
      ".avatar-preset.border-primary"
    )) {
      el.classList.remove("border-primary");
    }
    // @ts-ignore
    event.target.classList.add("border-primary");
    
    // 自动滚动到profile-preview区域
    setTimeout(() => {
      const profilePreview = document.getElementById("profile-preview");
      if (profilePreview) {
        profilePreview.scrollIntoView({ 
          behavior: "smooth", 
          block: "center" 
        });
      }
    }, 100);
  }, []);

  return (
    <>
      {getAvatars().length === 0 && !isServer ? (
        <NoSearchResults thing="avatars" />
      ) : (
        <div className="gap-3 grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 min-[600px]:grid-cols-6 min-[720px]:grid-cols-7 md:grid-cols-5 translate-z-1">
          {getAvatars().map((avatar) => {
            return (
              <button
                key={avatar.n}
                className="avatar-preset button-tile"
                onClick={(e) => {
                  onSelectAvatar(e, avatar.n, avatar.f);
                }}
                aria-label={avatar.n}
              >
                <Image
                  src={`/avatars/${avatar.f}`}
                  className="rounded-full pointer-events-none"
                />
              </button>
            );
          })}
        </div>
      )}
    </>
  );
};

const DecorationsTabs = () => {
  const { decorationsData } = useContext(CurrentData);

  // Since we only have one category now, we don't need tabs
  return (
    <div className="relative h-[532px] overflow-clip">
      {decorationsData.map(({ name, data }, index) => (
        <DecorationsList
          key={name}
          {...{
            decorationsList: data,
          }}
          style={{
            transform: "translateX(0)",
            zIndex: 1,
          }}
          className="top-0 right-0 bottom-0 left-0 absolute"
        />
      ))}
    </div>
  );
};

const DecorationsList = ({ decorationsList, style, className }) => {
  const { decoSearch, setName, setDescription, setDecoUrl } =
    useContext(CurrentData);

  const getDecorations = useCallback(() => {
    if (isServer) return [];
    return decorationsList
      .map((c) => ({
        ...c,
        i: c.i.filter(
          (e) =>
            e.n.toLowerCase().includes(decoSearch.toLowerCase()) ||
            e.d.toLowerCase().includes(decoSearch.toLowerCase()) ||
            c.n.toLowerCase().includes(decoSearch.toLowerCase()) ||
            c.d.toLowerCase().includes(decoSearch.toLowerCase())
        ),
      }))
      .filter((category) => category.i.length > 0);
  }, [decorationsList, decoSearch]);

  const onSelectDecor = useCallback((event, name, description, file) => {
    setName(name);
    setDescription(description);
    setDecoUrl(`/decorations/${file}.png`);

    for (const el of document.querySelectorAll(".decor.border-primary")) {
      el.classList.remove("border-primary");
    }
    event.target.classList.add("border-primary");
    
    // 自动滚动到profile-preview区域
    setTimeout(() => {
      const profilePreview = document.getElementById("profile-preview");
      if (profilePreview) {
        profilePreview.scrollIntoView({ 
          behavior: "smooth", 
          block: "center" 
        });
      }
    }, 100);
  }, []);

  return (
    <div
      className={`mt-1 py-1 overflow-auto discord-scrollbar ${className}`}
      style={style}
    >
      {getDecorations().length === 0 && !isServer ? (
        <NoSearchResults thing="decorations" />
      ) : (
        getDecorations().map((category) => {
          return (
            <div
              key={
                typeof category.b.i === "string"
                  ? category.b.i
                  : category.b.i.length > 0
                  ? category.b.i[0].url
                  : category.n
              }
              className="mt-8 first:mt-0"
            >
              <DecorationsCategoryBanner category={category} />

              <div className="gap-3 grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 min-[600px]:grid-cols-6 min-[720px]:grid-cols-7 md:grid-cols-5 w-full">
                {category.i.map((decor) => {
                  return (
                    <Decoration
                      name={decor.n}
                      fileName={decor.f}
                      onClick={(e) =>
                        onSelectDecor(e, decor.n, decor.d, decor.f)
                      }
                    />
                  );
                })}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

const DecorationsCategoryBanner = ({ category }) => {
  return (
    <div className="relative justify-center items-center grid grid-cols-1 grid-rows-1 bg-black mb-4 rounded-2xl w-full h-28 overflow-hidden">
      {typeof category.b.i !== "string" ? (
        <>
          <div
            className="top-0 right-0 bottom-0 left-0 absolute"
            style={{
              background: category.b.bg || "#000",
            }}
          />
          {category.b.i.map((e, i) => (
            <Image
              key={e.url}
              className={"object-cover bottom-0 absolute"}
              src={`/banners/${e.url}${e.url.includes(".") ? "" : ".webp"}`}
              alt={""}
              draggable={false}
              height={0}
              width={0}
              style={{
                height: e.height || "auto",
                width: e.width || (e.height ? "auto" : "100%"),
                left: e.align.includes("left") || e.align === "center" ? 0 : "",
                right:
                  e.align.includes("right") || e.align === "center" ? 0 : "",
                top: e.align.includes("top") ? 0 : "",
                bottom: e.align.includes("bottom") ? 0 : "",
                objectPosition: e.align,
                opacity: e.opacity || 1,
                transform: e.transform || "",
              }}
            />
          ))}
        </>
      ) : (
        <Image
          className="object-cover [grid-column:1/1] [grid-row:1/1]"
          src={`/banners/${category.b.i}${
            category.b.i.includes(".") ? "" : ".webp"
          }`}
          alt={""}
          draggable={false}
          height={0}
          width={0}
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            objectPosition: category.b.bgPos || "",
          }}
        />
      )}
      <div className="relative flex flex-col justify-center items-center p-4 h-full [grid-column:1/1] [grid-row:1/1]">
        {category.b.t ? (
          category.b.t === "" ? (
            <div
              style={{
                height: `${category.b.h || 48}px`,
                width: "100%",
              }}
            />
          ) : (
            <Image
              src={`/bannertext/${category.b.t}${
                category.b.t.includes(".") ? "" : ".webp"
              }`}
              alt={category.n}
              draggable={false}
              height={0}
              width={0}
              style={{
                height: `${category.b.h || 48}px`,
                width: "auto",
              }}
            />
          )
        ) : (
          <>
            {!category.hideTitle && (
              <p
                className="px-4 text-3xl text-center ginto"
                style={{
                  color: category.darkText || false ? "#000" : "#fff",
                }}
              >
                {category.n.toLowerCase().includes("nitro") ? (
                  <Svg.Nitro className="my-2" />
                ) : (
                  category.n
                )}
              </p>
            )}
          </>
        )}
        <p
          className="w-[232px] xs:w-full font-medium text-sm text-center [line-height:1]"
          style={{
            color: category.darkText || false ? "#000" : "#fff",
            marginTop: category.descTopM || "",
          }}
        >
          {category.d.includes("\n")
            ? category.d.split("\n").map((e, i) => (
                <Fragment key={i}>
                  {i > 0 && <br />}
                  {e}
                </Fragment>
              ))
            : category.d}
        </p>
        {category.badge && (
          <p className="top-2 right-2 absolute bg-white m-0 px-2 py-0 rounded-full font-semibold text-black text-xs [letter-spacing:0]">
            {category.badge}
          </p>
        )}
      </div>
    </div>
  );
};

const Decoration = ({ name, fileName, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [timer, setTimer] = useState(null);

  return (
    <Image
      key={name}
      src={
        isHovered
          ? `/decorations/${fileName}.png`
          : `/mdecorations/${fileName}.webp`
      }
      className="button-tile decor"
      draggable={false}
      onClick={onClick}
      onMouseOver={() => {
        const intervalId = setInterval(() => {
          setIsHovered(true);
          try {
            clearTimeout(timer);
          } catch (e) {}
        }, 100);
        setTimer(intervalId);
      }}
      onMouseOut={() => {
        setIsHovered(false);
        try {
          clearTimeout(timer);
        } catch (e) {}
      }}
    />
  );
};

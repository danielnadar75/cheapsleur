import React from "react";

type Props = {
  text: string;
  url: string;
  time?: {
    start: number;
    end: number;
  };
};

/**
 *
 *  https://learn.pimsleur.com/static/playingOut.0e7f7d61.svg
 *  https://learn.pimsleur.com/static/playingIn.5c0b4809.svg
 */

const AudioTextCard = ({ text, url, time }: Props) => {
  const audioRef = React.useRef<HTMLAudioElement>(null);
  const [isAudioPlaying, setIsAudioPlaying] = React.useState(false);

  const percesion = (number: number) => {
    return +number.toFixed(3);
  };

  const handlePlayAudio = () => {
    if (!audioRef.current) return;

    if (!audioRef.current.paused) {
      audioRef.current.pause();
      setIsAudioPlaying(false);
      return;
    }

    setIsAudioPlaying(true);
    if (time && time.start) {
      const { start, end } = time;
      const st = percesion(start / 1000);
      const et = percesion(end / 1000);
      audioRef.current.currentTime = st;

      audioRef.current.addEventListener("timeupdate", (e: any) => {
        if (percesion(e.target.currentTime) >= et) {
          audioRef.current?.pause();
          setIsAudioPlaying(false);
        }
      });
    }

    audioRef.current.play();
  };

  return (
    <div className="border rounded shadow-orange-200 shadow-lg my-4">
      <div className="flex justify-start items-center m-4 ">
        <audio ref={audioRef} className="hidden" src={url}></audio>
        <button
          className="w-[20%] px-4 text-xl rounded text-white py-2"
          onClick={handlePlayAudio}
        >
          {isAudioPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="6vh"
              width="12vw"
              version="1.1"
              id="_x32_"
              viewBox="0 0 512 512"
            >
              <style type="text/css">{`.st0{fill:#000000;}`}</style>
              <g>
                <path
                  className="st0"
                  d="M256,0C114.625,0,0,114.625,0,256c0,141.374,114.625,256,256,256s256-114.626,256-256   C512,114.625,397.375,0,256,0z M224,336h-64V176h64V336z M352,336h-64V176h64V336z"
                />
              </g>
            </svg>
          ) : (
            <div className="div">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#000000"
                height="6vh"
                width="12vw"
                version="1.1"
                id="Layer_1"
                viewBox="0 0 512 512"
              >
                <g>
                  <g>
                    <path d="M256,0C114.511,0,0,114.497,0,256c0,141.49,114.495,256,256,256c141.49,0,256-114.497,256-256C512,114.51,397.503,0,256,0    z M348.238,284.418l-120.294,69.507c-10.148,5.864-22.661,5.874-32.826,0.009c-10.158-5.862-16.415-16.699-16.415-28.426V186.493    c0-11.728,6.258-22.564,16.415-28.426c5.076-2.93,10.741-4.395,16.406-4.395c5.67,0,11.341,1.468,16.42,4.402l120.295,69.507    c10.149,5.864,16.4,16.696,16.4,28.418C364.639,267.722,358.387,278.553,348.238,284.418z" />
                  </g>
                </g>
              </svg>
            </div>
          )}
        </button>
        <p className=" px-4 mx-4">{text}</p>
      </div>
    </div>
  );
};

export default AudioTextCard;

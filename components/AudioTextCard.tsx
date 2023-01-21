import React from "react";
import PlaySVG from "./svg/PlaySVG";
import StopSVG from "./svg/StopSVG";

type Props = {
  text: string;
  url: string;
  time?: {
    start: number;
    end: number;
  };
  position?: "right" | "left";
};

/**
 *
 *  https://learn.pimsleur.com/static/playingOut.0e7f7d61.svg
 *  https://learn.pimsleur.com/static/playingIn.5c0b4809.svg
 */

const AudioTextCard = ({ text, url, time, position }: Props) => {
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
    <div
      className="rounded bg-white opacity-95 shadow-xl my-2 p-1"
      style={
        {
          // color: "#fff",
          // backgroundColor: "hsla(0,0%,100%,.1);",
          // textShadow: "#827e7e 1px 1px 2px;",
        }
      }
    >
      <div
        onClick={handlePlayAudio}
        className={`flex justify-start items-center ${
          position === "right" ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <audio ref={audioRef} className="hidden" src={url}></audio>
        <button className="w-[25%] px-4 text-xl rounded text-white py-2">
          {isAudioPlaying ? <StopSVG /> : <PlaySVG />}
        </button>
        <p className=" px-4 mx-4  shadow-[#827e7e 4px 4px 2px;] ">{text}</p>
      </div>
    </div>
  );
};

export default AudioTextCard;

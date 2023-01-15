import React, { AudioHTMLAttributes } from "react";

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

  const percesion = (number: number) => {
    return +number.toFixed(3);
  };

  const handlePlayAudio = () => {
    if (!audioRef.current) return;

    if (!audioRef.current.paused) {
      audioRef.current.pause();
      return;
    }

    if (time && time.start) {
      const { start, end } = time;
      const st = percesion(start / 1000);
      const et = percesion(end / 1000);
      audioRef.current.currentTime = st;

      audioRef.current.addEventListener("timeupdate", (e: any) => {
        if (percesion(e.target.currentTime) >= et) {
          audioRef.current?.pause();
        }
      });
    }

    audioRef.current.play();
  };

  return (
    <div className="border rounded shadow-orange-200 shadow-lg   ">
      <div className="flex justify-around m-4 ">
        <audio ref={audioRef} className="hidden" src={url}></audio>
        <button
          className=" px-8 text-xl font-bold rounded bg-orange-400 text-white p-4"
          onClick={handlePlayAudio}
        >
          Play
        </button>
        <p className="text-2xl p-4 mx-4">{text}</p>
        <label>{audioRef.current?.currentTime}</label>
      </div>
    </div>
  );
};

export default AudioTextCard;

import React from "react";
import Play from "./svg/Play";
import Pause from "./svg/Pause";
import SeekBack from "./svg/SeekBack";
import SeekForward from "./svg/SeekForward";

type Props = {
  isPlaying: boolean;
  onPlayPauseClick: (arg: boolean) => void;
  onPrevClick: () => void;
  onNextClick: () => void;
};

const LessonAudioControls = ({
  isPlaying,
  onPlayPauseClick,
  onPrevClick,
  onNextClick,
}: Props) => (
  <div className="audio-controls">
    <button
      type="button"
      className="prev"
      aria-label="Previous"
      onClick={onPrevClick}
    >
      <SeekBack />
    </button>
    {isPlaying ? (
      <button
        type="button"
        className="pause"
        onClick={() => onPlayPauseClick(false)}
        aria-label="Pause"
      >
        <Pause />
      </button>
    ) : (
      <button
        type="button"
        className="play"
        onClick={() => onPlayPauseClick(true)}
        aria-label="Play"
      >
        <Play />
      </button>
    )}
    <button
      type="button"
      className="next"
      aria-label="Next"
      onClick={onNextClick}
    >
      <SeekForward />
    </button>
  </div>
);

export default LessonAudioControls;

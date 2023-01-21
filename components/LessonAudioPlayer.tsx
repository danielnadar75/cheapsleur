import { formatSecs } from "@/utils/common";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import LessonAudioControls from "./LessonAudioControls";

type Props = {
  url: string;
  imageUrl: string;
};

const LessonAudioPlayer = ({ url, imageUrl }: Props) => {
  // State
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);

  //tracks[trackIndex];

  // Refs
  const audioRef = useRef<HTMLAudioElement>();
  const intervalRef = useRef<NodeJS.Timer>();

  useEffect(() => {
    const audio = new Audio(url);
    audioRef.current = audio;

    audioRef.current.addEventListener("loadedmetadata", (e: any) => {
      const { duration } = e.target;
      setDuration(duration);
    });

    const cTime = localStorage.getItem("currentLessonTime");
    if (cTime) {
      audioRef.current.currentTime = +cTime;
      setTrackProgress(+cTime);
    } else {
      setTrackProgress(0);
    }
  }, [url]);

  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : "0%";
  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
  `;

  const startTimer = () => {
    // Clear any timers already running
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current?.ended) {
        // toNextTrack();
      } else {
        setTrackProgress(audioRef.current?.currentTime ?? 0);
      }
      //@ts-ignore
    }, [1000]);
  };

  const onScrub = (value: number) => {
    // Clear any timers already running
    clearInterval(intervalRef.current);
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setTrackProgress(audioRef.current?.currentTime ?? 0);
      localStorage.setItem(
        "currentLessonTime",
        String(audioRef.current.currentTime)
      );
    }
  };

  const onScrubEnd = () => {
    // If not already playing, start
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  const seekBackward = () => {
    if (audioRef.current) {
      const newTime = trackProgress - 15 < 0 ? 0 : trackProgress - 15;
      audioRef.current.currentTime = newTime;
      setTrackProgress(newTime);
    }
  };

  const seekForward = () => {
    if (audioRef.current) {
      const newTime =
        trackProgress + 15 > audioRef.current.duration
          ? audioRef.current.duration
          : trackProgress + 15;
      audioRef.current.currentTime = newTime;
      setTrackProgress(newTime);
    }
  };

  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    // Pause and clean up on unmount
    return () => {
      audioRef.current?.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="audio-player">
      <div className="track-info">
        <Image
          className="artwork"
          src={imageUrl}
          alt={`track artwork`}
          width="250"
          height="250"
        />
        <LessonAudioControls
          isPlaying={isPlaying}
          onPrevClick={seekBackward}
          onNextClick={seekForward}
          onPlayPauseClick={() => {
            localStorage.setItem(
              "currentLessonTime",
              String(audioRef.current?.currentTime) ?? 0
            );
            setIsPlaying(!isPlaying);
          }}
        />
        <input
          type="range"
          value={trackProgress}
          step="1"
          min="0"
          max={duration ? duration : `${duration}`}
          className="progress"
          onChange={(e) => onScrub(+e.target.value)}
          onMouseUp={onScrubEnd}
          onKeyUp={onScrubEnd}
          style={{ background: trackStyling }}
        />
        <div className="flex justify-between">
          <p>{formatSecs(trackProgress)}</p>
          <p>{formatSecs(duration)}</p>
        </div>
      </div>
    </div>
  );
};

export default LessonAudioPlayer;

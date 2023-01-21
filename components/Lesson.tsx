import AudioTextCard from "@/components/AudioTextCard";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import React from "react";
import Header from "./Header";
import LessonAudioPlayer from "./LessonAudioPlayer";

type Props = {
  url: string;
  title: string;
  imageUrl: string;
};

const Lesson = ({ url, title, imageUrl }: Props) => {
  return (
    <div>
      <Header title={title} />

      <div className="w-full h-[75vh] overflow-hidden flex flex-col justify-center">
        <div className="w-full">
          <LessonAudioPlayer url={url} imageUrl={imageUrl} />
        </div>
      </div>
    </div>
  );
};

export default Lesson;

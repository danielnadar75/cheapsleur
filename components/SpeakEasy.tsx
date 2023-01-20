import AudioTextCard from "@/components/AudioTextCard";
import { nanoid } from "nanoid";
import React from "react";

type Props = {
  url: string;
  data: {
    start: number;
    stop: number;
    speaker: "M" | "F";
    text: string;
    order: number;
  }[];
};

const SpeakEasy = ({ data, url }: Props) => {
  return (
    <div>
      <div className="w-full" key={nanoid(5)}>
        {data.map((item) => (
          <div
            key={nanoid(5)}
            className={item.speaker === "M" ? "mr-8" : "ml-8"}
          >
            <AudioTextCard
              time={{ start: item.start, end: item.stop }}
              text={item.text}
              url={url}
            />
          </div>
        ))}
      </div>

      <div className="border mt-16 w-auto text-center p-4">
        {/* <button>
          <AudioTextCard
            time={{ start: data[0].start, end: data[data.length - 1].stop }}
            text={"Play All"}
            url={url}
          />
        </button> */}
      </div>
    </div>
  );
};

export default SpeakEasy;

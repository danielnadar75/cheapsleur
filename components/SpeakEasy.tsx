import AudioTextCard from "@/components/AudioTextCard";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import React from "react";
import Header from "./Header";

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
  const router = useRouter();

  return (
    <div>
      <Header title={`Speak Easy ${router.query.unit}`} />

      <div className="w-full h-[72vh] overflow-y-auto ">
        {data.map((item) => (
          <div
            key={nanoid(5)}
            className={item.speaker === "M" ? "mr-16 ml-4" : "ml-16  mr-4"}
          >
            <AudioTextCard
              time={{ start: item.start, end: item.stop }}
              text={item.text}
              url={url}
              position={item.speaker === "M" ? "left" : "right"}
            />
          </div>
        ))}
      </div>

      {data[0] && data[data.length - 1] && (
        <div className="w-auto text-center p-2 ">
          <button>
            <AudioTextCard
              time={{
                start: data[0]?.start ?? 0,
                end: data[data.length - 1]?.stop ?? 0,
              }}
              text={"Play All"}
              url={url}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default SpeakEasy;

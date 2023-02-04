import AudioTextCard from "@/components/AudioTextCard";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import React from "react";
import Header from "./Header";

type Props = {
  url: string | undefined;
  data: {
    start: number;
    stop: number;
    speaker: "M" | "F";
    text: string;
    nativeText: string;
    order: number;
  }[];
};

const Reading = ({ data, url }: Props) => {
  const router = useRouter();

  return (
    <div>
      <Header title={`Reading ${router.query.unit}`} />

      <div className="w-full h-[80vh] overflow-y-auto" key={nanoid(5)}>
        {url ? (
          data.map((item) => (
            <div key={nanoid(5)} className={"m-4"}>
              <AudioTextCard
                time={{ start: item.start, end: item.stop }}
                text={item.nativeText}
                additionalText={`[${item.text}] `}
                url={url}
              />
            </div>
          ))
        ) : (
          <div className="flex flex-col justify-center items-center h-full">
            <h3 className="mx-8 my-2 text-xl font-bold text-white">
              No Reading Lesson For This Unit
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reading;

import FalshCards from "@/components/FalshCards";
import Lesson from "@/components/Lesson";
import LessonAudioPlayer from "@/components/LessonAudioPlayer";
import Reading from "@/components/Reading";
import SpeakEasy from "@/components/SpeakEasy";
import axios, { AxiosResponse } from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

type PracticeData = {
  unitNumber: number;
  hasSkills: true;
  quickMatches: {
    question: {
      cue: string;
      transliteration: string;
      mp3FileName: string;
      quickMatchId: number;
    };
    answer: {
      cue: string;
      transliteration: string;
      mp3FileName: string;
      quickMatchId: number;
    };
    group: string;
    skills: string[];
    usedForSpeechRecognition: true;
    questions: false;
  }[];
  flashCards: {
    translation: string;
    language: string;
    mp3FileName: string;
  }[];
  speakEasies: {
    start: number;
    stop: number;
    speaker: "M" | "F";
    text: string;
    order: number;
  }[];
  readings: [];
  hasQuickMatch: true;
  hasFlashCard: true;
  hasSpeakEasy: true;
  hasReading: false;
};

type LessonData = {
  courseId: number;
  languageName: string;
  languageId: number;
  isFree: false;
  isEsl: false;
  lessons: {
    image: {
      fullImageAddress: string;
      thumbImageAddress: string;
      credits: number | null;
    };
    name: string;
    audioLink: string;
    level: number;
    lessonNumber: string;
    mediaItemId: number;
    cultureContent: {
      imageLocation: string;
      imageDescription: string;
      imageCredits: string;
    };
  }[];
  readings: {
    puReadingIntroPdf: string;
    audios: {
      order: number;
      audioLink: string;
      mediaItemId: number;
    }[];
  };
  languageCode: string;
  recognitionTier: number;
  hasBreakdown: boolean;
  productCode: string;
  level: number;
  courseName: string;
  simpleCourseName: string;
  puArabic: boolean;
};

export default function Learn() {
  const router = useRouter();

  const [lessonData, setLessonData] = React.useState<LessonData>();
  const [practiceData, setPracticeData] = React.useState<PracticeData[]>([]);
  const [unit, setUnit] = React.useState(
    router.query.unit ? +router.query.unit : 1
  );
  const [tab, setTab] = React.useState(0);

  const fetchData = async () => {
    try {
      const res = await axios.get(process.env.NEXT_PUBLIC_LESSON ?? "");
      console.log(res.data.lesson);
      const lessonData: LessonData = res.data[0];
      setLessonData(lessonData);
    } catch (error) {
      console.log("Error fetching lesson data", error);
    }

    try {
      const res = await axios.get(process.env.NEXT_PUBLIC_EXTRA ?? "");
      console.log(res.data.practicesInUnits);
      const practiceData: PracticeData[] = res.data.practicesInUnits;
      setPracticeData(practiceData);
    } catch (error) {
      console.log("Error fetching practice data", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    if (router && router.query && router.query.unit) {
      setUnit(+router.query.unit);
    }
  }, [router]);

  return (
    <>
      <main
        className="h-[94vh] bg-gray-900 overflow-hidden"
        style={{
          background:
            'url("https://learn.pimsleur.com/static/PMBackgroundLarge.54afe843.svg")',
          backgroundPositionX: "center",
          backgroundPositionY: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="w-full h-full">
          {tab === 0 && (
            <Lesson
              url={lessonData?.lessons[unit - 1]?.audioLink ?? ""}
              title={lessonData?.lessons[unit - 1]?.name ?? "Lesson"}
              imageUrl={
                lessonData?.lessons[unit - 1]?.image.thumbImageAddress ??
                process.env.NEXT_PUBLIC_SAMPLE_IMAGE!
              }
            />
          )}

          {tab == 1 && (
            <Reading
              data={practiceData[unit - 1]?.readings ?? []}
              url={
                lessonData?.readings.audios.find((r) => r.order === unit)
                  ?.audioLink
              }
            />
          )}

          {tab == 2 && (
            <SpeakEasy
              data={practiceData[unit - 1]?.speakEasies ?? []}
              url={lessonData?.lessons[unit - 1]?.audioLink ?? ""}
            />
          )}

          {tab == 3 && (
            <FalshCards
              title={"Flash Cards"}
              data={practiceData[unit - 1]?.flashCards ?? []}
            />
          )}
        </div>
      </main>

      <footer className="flex justify-between bg-blue-900 h-[6vh]">
        <button
          className={`border  text-white p-4 ${tab === 0 ? "bg-black" : ""}`}
          onClick={() => setTab(0)}
        >
          Le
        </button>
        <button
          className={`border  text-white p-4 ${tab === 1 ? "bg-black" : ""}`}
          onClick={() => setTab(1)}
        >
          Re
        </button>
        <button
          className={`border  text-white p-4 ${tab === 2 ? "bg-black" : ""}`}
          onClick={() => setTab(2)}
        >
          Se
        </button>
        <button
          className={`border  text-white p-4 ${tab === 3 ? "bg-black" : ""}`}
          onClick={() => {
            setTab(3);
          }}
        >
          Fl
        </button>
        <button
          className={`border  text-white p-4 ${tab === 4 ? "bg-black" : ""}`}
        >
          Qm
        </button>
      </footer>
    </>
  );
}

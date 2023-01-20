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
      <main>
        <h1 className="text-xl font-bold">
          {router.query.language}/{router.query.unit}
        </h1>

        <div>
          <h2 className="mb-4 text-4xl font-bold text-gray-700"> Speak Easy</h2>
          <SpeakEasy
            data={practiceData[unit - 1]?.speakEasies ?? []}
            url={lessonData?.lessons[unit - 1]?.audioLink ?? ""}
          />
        </div>
      </main>
    </>
  );
}

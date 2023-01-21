import Dropdown from "@/components/Dropdown";
import LessonAudioPlayer from "@/components/LessonAudioPlayer";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function Home() {
  const router = useRouter();

  const [language, setLanguage] = useState<string>("Language");
  const [level, setLevel] = useState<string>("Level");
  const [unit, setUnit] = useState<string>("Unit");

  const handleLanguageSelection = (langKey: string) => {
    setLanguage(langKey);
    localStorage.setItem("language", langKey);
  };

  const handleLevelSelection = (level: string) => {
    setLevel(`Level - ${level}`);
    localStorage.setItem("level", level);
  };

  const handleUnitSelection = (unit: string) => {
    setUnit(`Unit - ${unit}`);
    localStorage.setItem("unit", unit);
  };

  const handleLaunchCourse = () => {
    if (language !== "Language" && unit !== "Unit") {
      localStorage.setItem("currentLessonTime", String(0));
      router.push(`${language}/${unit.split("Unit - ")[1]}`);
    }
  };

  const handleContinue = () => {
    const language = localStorage.getItem("language");
    const unit = localStorage.getItem("unit");
    if (language && language !== "Language" && unit && unit !== "Unit") {
      router.push(`${language}/${unit}`);
    }
  };

  return (
    <>
      <Head>
        <title>Pimselur Clone</title>
        <meta name="description" content="Pimselur Course Clone" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main
        className="h-[100vh] bg-gray-900"
        style={{
          background:
            'url("https://learn.pimsleur.com/static/PMBackgroundLarge.54afe843.svg")',
          backgroundPositionX: "center",
          backgroundPositionY: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="flex flex-col justify-center items-center gap-8 h-2/3">
          <h1 className="self-center text-4xl font-bold text-[#000032] m-8">
            Cheapsleru!
          </h1>

          <div className="flex flex-col gap-8">
            <Dropdown
              title={language}
              options={[{ key: "french", label: "French" }]}
              handleOnClick={handleLanguageSelection}
            />

            <Dropdown
              title={level}
              options={[
                { key: "1", label: "01" },
                // { key: "2", label: "02" },
                // { key: "3", label: "03" },
              ]}
              handleOnClick={handleLevelSelection}
            />

            <Dropdown
              title={unit}
              options={Array.from({ length: 10 }).map((e, i) => ({
                key: `${i + 1}`,
                label: `${i + 1}`,
              }))}
              handleOnClick={handleUnitSelection}
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            className="bg-blue-800 text-gray-100 px-4 py-2"
            onClick={handleLaunchCourse}
          >
            Launch Course
          </button>

          <button
            className="bg-blue-900 text-gray-100 px-4 py-2"
            onClick={handleContinue}
          >
            Continue
          </button>
        </div>
      </main>
    </>
  );
}

import React, { MutableRefObject, useCallback, useRef } from "react";
import Header from "./Header";
import ReactCardFlip from "react-card-flip";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import { NavigationOptions } from "swiper/types";
import SwiperClass from "swiper";
import { MdVolumeMute, MdVolumeUp } from "react-icons/md";

import "swiper/css";
import "swiper/css/navigation";

type Props = {
  title: string;
  data: Record<string, any>[];
};

const Button = ({ name, icon }: { name: string; icon: string }) => (
  <button>
    <div>{name}</div>
    <div>{icon}</div>
  </button>
);

const FalshCards = ({ title, data }: Props) => {
  const [isFlipped, setIsFlipped] = React.useState<boolean>(true);
  const [isPlaying, setIsPlaying] = React.useState<boolean>(false);
  const flashCardRef = useRef<SwiperClass>();

  /* Functions */
  const handleAudio = useCallback((audio: string) => {
    const mp3 = new Audio();
    mp3.src = audio;
    mp3.onloadeddata = () => {
      setIsPlaying(true);
      mp3.play();
    };
    mp3.onended = () => setIsPlaying(false);
  }, []);

  /* Styles */
  const cardStyles = {
    front: {
      backgroundColor: "white",
      borderRadius: "8px",
    },
    back: {
      backgroundColor: "white",
      borderRadius: "8px",
    },
  };

  const containerStyle = {
    minWidth: "70%",
    height: "40vh",
    margin: "auto",
  };

  return (
    <div className="w-full h-full">
      <Header title={title} />

      <div className="flex items-center justify-center w-full h-[calc(100%_-_5rem)] px-6">
        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={30}
          className="card-swiper"
          onBeforeInit={(swiper) => {
            flashCardRef.current = swiper;
          }}
        >
          {data.map((card, index) => (
            <SwiperSlide key={index}>
              <ReactCardFlip
                isFlipped={isFlipped}
                cardStyles={cardStyles}
                containerStyle={containerStyle}
              >
                {/* Front */}
                <div
                  className="w-full h-full"
                  onClick={() => setIsFlipped(true)}
                >
                  <div className="flex items-center justify-center w-full h-10 bg-white border-b-2 border-gray-300 rounded-t-lg">
                    <h1 className="font-bold text-gray-500">ENGLISH</h1>
                  </div>

                  <div className="flex w-full h-[calc(100%_-_2.5rem)] text-lg text-gray-700 justify-center">
                    <div className="flex items-center justify-center w-full h-2/3">
                      {card.translation}
                    </div>
                  </div>
                </div>
                {/* Back */}
                <div className="w-full h-full">
                  <div
                    className="relative w-full h-full"
                    onClick={() => setIsFlipped(false)}
                  >
                    <div className="flex items-center justify-center w-full h-10 bg-white border-b-2 border-gray-300 rounded-t-lg">
                      <h1 className="font-bold text-gray-500">French</h1>
                    </div>
                    <div className="flex flex-col items-center justify-start w-full h-[calc(100%_-_2.5rem)] text-lg text-gray-700">
                      <span className="flex items-center justify-center w-full h-2/3">
                        {card.language}
                      </span>
                    </div>
                  </div>
                  <div className="absolute bottom-0 flex items-center justify-center w-full h-1/3">
                    <div
                      className={`p-4 border-2 border-gray-400 rounded-full hover:bg-[#525252] hover:text-white hover:border-white duration-100 ease-in-out ${
                        isPlaying
                          ? "bg-[#525252] text-white "
                          : " bg-white text-black"
                      }`}
                      onClick={() => handleAudio(card.mp3FileName)}
                    >
                      {isPlaying ? (
                        <MdVolumeUp className="text-3xl" />
                      ) : (
                        <MdVolumeMute className="text-3xl" />
                      )}
                    </div>
                  </div>
                </div>
              </ReactCardFlip>
            </SwiperSlide>
          ))}
          <div className="w-full mt-4">
            <div
              className="w-1/4 bg-[#525252] ml-auto rounded-full p-2 text-white text-lg text-center shadow font-semibold"
              onClick={() => flashCardRef.current?.slideNext()}
            >
              Next
            </div>
          </div>
        </Swiper>
      </div>
    </div>
  );
};

export default FalshCards;

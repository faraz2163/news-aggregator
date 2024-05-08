import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import React, { useEffect, useState } from "react";
import { timeSince } from "../utils";

const Slider = ({ articles, title = "Editor's Pick" }) => {
  const [index, setIndex] = useState(0);
  const [currentSelected, setCurrentSelected] = useState(articles[index]);

  useEffect(() => {
    setCurrentSelected(articles[index]);
  }, [index, articles]);

  return articles?.length ? (
    <div className="w-full">
      <h1 className="text-3xl">{title}</h1>
      <div className="slider flex justify-center items-center">
        <div className="text-side absolute left-0 w-[45%] z-50">
          <div className="p-8 bg-white bg-opacity-30 backdrop-blur-xl rounded-[30px] flex flex-col gap-4 min-h-[150px]">
            <h4 className="text-xl text-indigo-600">
              {currentSelected.source.name}
            </h4>
            <h3 className="text-xl font-semibold">{currentSelected.title}</h3>
            <p className="text-slate-900 text-opacity-70">
              <span>{timeSince(new Date(currentSelected.pub_date))} ago</span> |
              By <span>{currentSelected.author}</span>
            </p>
          </div>
        </div>

        {/* <div className="text-side absolute left-0 w-[45%] z-50"></div> */}
        <div className="ml-auto w-[65%] relative">
          <img
            src={currentSelected.img}
            alt=""
            className="object-cover object-center h-[470px] w-full rounded-2xl"
          />
          <div className="text-left absolute bottom-16 right-full pr-8 flex gap-3">
            <button
              onClick={() => setIndex((prev) => (prev === 0 ? prev : prev - 1))}
              className="w-12 h-12 bg-white rounded-full flex justify-center items-center"
            >
              <ChevronLeftIcon width={20} />
            </button>
            <button
              onClick={() =>
                setIndex((prev) =>
                  prev === articles.length - 1 ? prev : prev + 1
                )
              }
              className="w-12 h-12 bg-white rounded-full flex justify-center items-center"
            >
              <ChevronRightIcon width={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Slider;

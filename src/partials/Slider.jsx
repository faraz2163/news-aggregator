import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import React, { useEffect, useState } from "react";
import { getAuthorName, timeSince } from "../utils";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Slider = ({ articles, loading, title = "Editor's Pick" }) => {
  const [index, setIndex] = useState(0);
  const [currentSelected, setCurrentSelected] = useState(articles[index]);
  const [imageLoading, setImageLoading] = useState(true);
  useEffect(() => {
    setCurrentSelected(articles[index]);
  }, [index, articles]);

  const handleImageOnload = () => {
    setImageLoading(false);
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl">{title}</h1>
      <div className="slider grid grid-cols-1 md:flex md:justify-center md:item-center">
        <div className="text-side md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2 w-full z-50 md:w-[45%] order-2">
          {articles?.length ? (
            <a href={currentSelected?.url}>
              <div className="p-8 bg-white bg-opacity-30 backdrop-blur-xl rounded-[30px] flex flex-col gap-4 min-h-[150px]">
                <h4 className="text-xl text-indigo-600">
                  {loading ? (
                    <Skeleton height={28} />
                  ) : (
                    currentSelected?.source?.name
                  )}
                </h4>
                <h3 className="text-xl font-semibold">
                  {loading ? <Skeleton height={28} /> : currentSelected?.title}
                </h3>
                <p className="text-slate-900 text-opacity-70">
                  {loading ? (
                    <Skeleton height={22} width={100} />
                  ) : (
                    <span>{timeSince(currentSelected?.pub_date)} ago</span>
                  )}
                  {loading ? (
                    <Skeleton height={22} width={120} />
                  ) : (
                    getAuthorName(currentSelected?.author, " | By ")
                  )}
                </p>
              </div>
            </a>
          ) : (
            <Skeleton height={150} />
          )}
        </div>
        {/* <div className="text-side absolute left-0 w-[45%] z-50"></div> */}
        <div className="ml-auto w-full relative md:w-[65%] order-1">
          {imageLoading === true ? (
            <div
              className={`h-[270px] w-full rounded-2xl md:h-[470px] ${
                imageLoading ? "block" : "hidden"
              }`}
            >
              <Skeleton width={"100%"} height={"100%"} />
            </div>
          ) : (
            ""
          )}
          <img
            src={currentSelected?.img}
            alt=""
            className={`object-cover object-center h-[270px] w-full rounded-2xl md:h-[470px]  ${
              imageLoading ? "hidden" : "block"
            }`}
            onLoad={handleImageOnload}
          />
          <div className="text-left absolute bottom-4 right-4 md:bottom-16 md:right-full md:pr-8 flex gap-1">
            <button
              onClick={() => {
                setImageLoading(true);
                setIndex((prev) => (prev === 0 ? prev : prev - 1));
              }}
              className="w-8 h-8 md:w-12 md:h-12 bg-white rounded-full flex justify-center items-center"
            >
              <ChevronLeftIcon width={20} />
            </button>
            <button
              onClick={() => {
                setImageLoading(true);
                setIndex((prev) =>
                  prev === articles.length - 1 ? prev : prev + 1
                );
              }}
              className="w-8 h-8 md:w-12 md:h-12 bg-white rounded-full flex justify-center items-center"
            >
              <ChevronRightIcon width={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;

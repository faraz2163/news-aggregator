import React from "react";
import Skeleton from "react-loading-skeleton";
import { timeSince, getAuthorName } from "../utils";

const Article = ({ article, loading, showImage = true }) => {
  return article === undefined && loading !== true ? (
    "Please provide article to render"
  ) : (
    <div className="rounded-2xl overflow-hidden">
      <a href={article?.url} target="_blank">
        {showImage && (
          <div>
            {loading ? (
              <Skeleton borderRadius="1rem" height="384px" />
            ) : (
              <img
                src={article?.img}
                alt=""
                className="object-cover object-center h-52 sm:h-64 w-full rounded-2xl lg:h-96"
              />
            )}
          </div>
        )}

        <div className="px-2 py-4 md:p-4 flex flex-col gap-2">
          <h4 className="text-xl text-indigo-600">
            {loading ? (
              <Skeleton height={28} width={200} />
            ) : (
              article?.source?.name
            )}
          </h4>
          <h3 className="text-xl font-semibold">
            {loading ? <Skeleton height={28} /> : article?.title}
          </h3>
          <p>{loading ? <Skeleton height={24} /> : article?.content}</p>
          <p className="text-gray-400 flex gap-2 items-center">
            {loading ? (
              <Skeleton width={150} />
            ) : (
              <span>{timeSince(article?.pub_date)} ago</span>
            )}
            {loading ? (
              <Skeleton width={250} />
            ) : (
              <>{getAuthorName(article?.author, " | By ")}</>
            )}
          </p>
        </div>
      </a>
      <hr className="mx-2 mb-4" />
    </div>
  );
};

export default Article;

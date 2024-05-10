import React, { useEffect } from "react";
import Container from "../Container";
import Card from "../Card";
import Article from "../Article";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewsFeed, selectNewsFeed } from "../../slices/newsFeedSlice";

const Feed = ({ articles, loading }) => {
  return (
    <Container className="flex-col">
      <Card className={`abc`}>
        {/* <div>
          <Article article={articles[0]} loading={loading} />
        </div> */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {loading
            ? Array.from({ length: 30 }, (_, index) => index).map(
                (skletonArrItem) => (
                  <div key={skletonArrItem}>
                    <Article article={{}} loading={loading} />
                  </div>
                )
              )
            : articles
                .filter((article) => article.img !== undefined)
                .map((article) => (
                  <div key={article.id}>
                    <Article article={article} loading={loading} />
                  </div>
                ))}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {articles
            .filter((article) => article.img === undefined)
            .map((article) => (
              <div className="f-flex" key={article.id}>
                <Article
                  article={article}
                  loading={loading}
                  showImage={false}
                />
              </div>
            ))}
        </div>
      </Card>
    </Container>
  );
};

export default Feed;

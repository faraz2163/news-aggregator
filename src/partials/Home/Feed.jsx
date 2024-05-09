import React, { useEffect } from "react";
import Container from "../Container";
import Card from "../Card";
import Article from "../Article";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewsFeed, selectNewsFeed } from "../../slices/newsFeedSlice";

const Feed = () => {
  const dispatch = useDispatch();
  const { articles, loading } = useSelector(selectNewsFeed);
  // const {}
  useEffect(() => {
    dispatch(fetchNewsFeed());
  }, []);

  return (
    <Container className="flex-col">
      <Card className={`abc`}>
        <div>
          <Article article={articles[0]} loading={loading} />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {articles
            .slice(1)
            .filter((article) => article.img !== undefined)
            .map((article) => (
              <div key={article.id}>
                <Article article={article} loading={loading} />
              </div>
            ))}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {articles
            .slice(1)
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

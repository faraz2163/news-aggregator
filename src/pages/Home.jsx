// import Footer from "../partials/Footer";
import { useDispatch, useSelector } from "react-redux";
import Feed from "../partials/Home/Feed";
import HeroSection from "../partials/Home/HeroSection";
import SliderSection from "../partials/Home/SliderSection";
import { fetchNewsFeed, selectNewsFeed } from "../slices/newsFeedSlice";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const { articles, loading } = useSelector(selectNewsFeed);
  // const {}
  useEffect(() => {
    dispatch(fetchNewsFeed());
  }, []);
  return (
    <>
      <HeroSection />
      <Feed articles={articles} loading={loading} />
      <SliderSection />
    </>
  );
};

export default Home;

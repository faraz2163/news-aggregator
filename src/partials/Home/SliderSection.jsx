import React from "react";
import Container from "../Container";
import Slider from "../Slider";
import { useSelector } from "react-redux";
import { selectEditorsPick } from "../../slices/editorsPickSlice";

const SliderSection = () => {
  const { articles, loading } = useSelector(selectEditorsPick);
  return (
    <Container className={`relative`}>
      <Slider articles={articles} loading={loading} />
    </Container>
  );
};

export default SliderSection;

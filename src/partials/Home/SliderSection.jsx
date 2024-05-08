import React from "react";
import Container from "../Container";
import Slider from "../Slider";
import { useSelector } from "react-redux";
import { selectEditorsPick } from "../../slices/editorsPickSlice";

const SliderSection = () => {
  const { articles, loading } = useSelector(selectEditorsPick);
  // const articles = [
  //   {
  //     id: 1,
  //     author: "Faraz Hussain",
  //     source: "The New York",
  //     title: "Testing out the newest feature yet 1",
  //     img: "https://s3-alpha-sig.figma.com/img/3bfd/3adf/2c3c2343ee7adaa3304072a73c38a577?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UEvCYGL-KdiPi~sbC~gQcbt9qrqvmwFl8ofjM1JAQnQifBCKfY8FIgT2VuFlDUGTJS-ZOeXSoxigl8t15uZKlgHVe5orKsWmTxyaj8q397mYFpMTchT2dr~LwnQMqYqnwndWwGVIrzTCfWBIDK5u2gJXmEKMH1SAp8LmTiZkgSMEJNTPTZGoJO-Ycuy9Sds~rJhRv4YtJ~FRD~7khl4h4eFnY2auP7CIb-a3355wGnaNiU2OurgegTBCTw~yRLYLkGpvNdeBuhGsr3LPnUSSekitF7vkyQl0SWiMeRtXoFqCQIUKfS3p-nbGlIOxG9NoEdjBkz-C6wplkquUd-SqIg__",
  //     pub_date: new Date(),
  //   },
  //   {
  //     id: 2,
  //     author: "Aneeq Hussain",
  //     source: "BBC",
  //     title: "Testing out the newest feature yet 2",
  //     img: "https://s3-alpha-sig.figma.com/img/8543/844f/18d9e16a6ca8af96e8e6fee66ced353e?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jLVWjyhAYBoerpsjKR4iUA0vXfm4O-YTupj8Mz4HF8gqd944RqFrUvSScYnPeY7XAd~XSoVGYHeGX7KinjcsCLKLoQ0Xh-J5Y4gUlliE02KbyN2JOTSja8363O33LUaPx-6wvyHpP0LZBB6YExtqi9t~a2AtmCu9BONRFHfc8Ig1-ho38aOmkNiqxeiFdMY9nITJVAOZcRXUqZKJph25QqcMkiiE6REhR5pu6xn0cSp7M0UERkGg2ZMryBh5bEGbJ9szCNaopga3rLlzZB-qnLKifc3n91dL8RSJHkNQrSQ2o2sd34vWz1edH3TZsge1FjNdDSm-JpjA2a00Rn37QQ__",
  //     pub_date: new Date(),
  //   },
  // ];
  return (
    <Container className={`relative`}>
      {!loading ? <Slider articles={articles} /> : "Loading"}
    </Container>
  );
};

export default SliderSection;

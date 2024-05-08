import NewsAPIService from "./NewsAPIService";
const services = {
  NewsAPI: new NewsAPIService(process.env.REACT_APP_NEWSAPI_KEY),
};
export default services;

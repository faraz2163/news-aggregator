import GuardianAPIService from "./GuardianAPIService";
import NYTimesAPIService from "./NYTimesAPIService";
import NewsAPIService from "./NewsAPIService";
const services = {
  NewsAPI: new NewsAPIService(process.env.REACT_APP_NEWSAPI_KEY),
  GuardianAPI: new GuardianAPIService(process.env.REACT_APP_GUARDIAN_API_KEY),
  NYTIMESAPI: new NYTimesAPIService(process.env.REACT_APP_NYTIMES_API_KEY),
};
export default services;

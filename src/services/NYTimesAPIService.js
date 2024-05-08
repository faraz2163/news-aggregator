import axios from "axios";

class NYTimesAPIService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.client = axios.create({
      baseURL: "https://api.nytimes.com",
      method: "GET",
      params: {
        "api-key": this.apiKey,
      },
    });
  }

  // /svc/search/v2/articlesearch.json
  async getNewsFeed() {
    const newsFeed = await this.client(``);
    return newsFeed;
  }

  async getEditorsPick() {
    const editorsPick = await this.client(`/svc/topstories/v2/home.json`);
    return editorsPick;
  }
}

export default NYTimesAPIService;

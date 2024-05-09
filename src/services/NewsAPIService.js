import axios from "axios";

class NewsAPIService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.client = axios.create({
      baseURL: "https://newsapi.org/v2",
      method: "GET",
      params: { apiKey: this.apiKey },
    });
  }

  async getNewsFeed(sources) {
    const params = new URLSearchParams();

    if (sources.length) {
      params.append("sources", sources.map((s) => s.id).join(","));
    }
    debugger;

    const newsFeed = await this.client(
      `/top-headlines${params.toString() !== "" ? "?" : ""}${params.toString()}`
    );
    return newsFeed;
  }

  async getEditorsPick(section) {
    const editorsPick = await this.client(`/top-headlines?sources=${section}`);

    return editorsPick;
  }

  async getSources() {
    const sources = await this.client("/top-headlines/sources");
    return sources;
  }

  // async
}

export default NewsAPIService;

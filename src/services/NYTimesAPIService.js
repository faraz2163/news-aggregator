import axios from "axios";
import { getLuceneSyntax } from "../utils";

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

  async getNewsFeed(source, section, country) {
    const FilterQueryArray = [];

    // filtering section that are available in this api
    const sec = section
      .filter((s) => s.sourcefrom !== "guardian")
      .map((s) => s.name);

    const sc = getLuceneSyntax("section_name", sec);
    const c = getLuceneSyntax(
      "glocations",
      country.map((c) => c.name)
    );

    if (sc) {
      FilterQueryArray.push(sc);
    }

    if (c) {
      FilterQueryArray.push(c);
    }

    const newsFeed = await this.client(
      `/svc/search/v2/articlesearch.json?sort=newest&${
        FilterQueryArray.length ? "fq=" + FilterQueryArray.join(" OR ") : ""
      }`
    );
    return newsFeed;
  }

  async getEditorsPick() {
    const editorsPick = await this.client(`/svc/topstories/v2/home.json`);
    return editorsPick;
  }
}

export default NYTimesAPIService;

import axios from "axios";

class NewsAPIService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.helper = new NewsAPIHelpers();
    this.client = axios.create({
      baseURL: "https://newsapi.org/v2",
      method: "GET",
      params: { apiKey: this.apiKey },
    });
  }

  async getSearchResults(q, sources, start, end) {
    const newsFeed = await this.client(
      this.helper.getSearchResultsUrlWithQueryString(q, sources, start, end)
    );
    return newsFeed;
  }

  async getNewsFeed(sources) {
    const newsFeed = await this.client(
      this.helper.getNewsFeedUrlWithQueryString(sources)
    );
    return newsFeed;
  }

  async getEditorsPick(section) {
    const editorsPick = await this.client(
      this.helper.getEditorsPickUrlWithQueryString(section)
    );
    return editorsPick;
  }

  async getSources() {
    const sources = await this.client(this.helper.getSourcesUrl());
    return sources;
  }

  // async
}

class NewsAPIHelpers {
  getNewsFeedUrlWithQueryString(sources) {
    const params = new URLSearchParams();
    console.log("NewsFeedCalled");

    if (sources.length) {
      params.append("sources", sources.map((s) => s.id).join(","));
    }
    return `/top-headlines${
      params.toString() !== "" ? "?" : ""
    }${params.toString()}`;
  }

  getEditorsPickUrlWithQueryString(section) {
    return `/top-headlines?sources=${section}`;
  }

  getSearchResultsUrlWithQueryString(q, sources, start, end) {
    const params = new URLSearchParams();

    if (q === "" || q === null || q === undefined)
      throw new Error("Search parameter required");

    params.append("q", q);
    if (sources.length) {
      params.append("sources", sources.map((s) => s.id).join(","));
    }

    if (start !== "") {
      params.append("from", start);
    }
    if (end !== "") {
      params.append("to", end);
    }

    return `/everything${
      params.toString() !== "" ? "?" : ""
    }${params.toString()}`;
  }

  getSourcesUrl() {
    return "/top-headlines/sources";
  }
}

export default NewsAPIService;

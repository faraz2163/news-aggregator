import axios from "axios";
import { getLuceneSyntax } from "../utils";

class NYTimesAPIService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.helper = new NYTimesAPIHelper();
    this.client = axios.create({
      baseURL: "https://api.nytimes.com",
      method: "GET",
      params: {
        "api-key": this.apiKey,
      },
    });
  }

  async getSearchResults(q, section, country, start, end) {
    const newsFeed = await this.client(
      this.helper.getSearchResultsUrlWithQueryString(
        q,
        section,
        country,
        start,
        end
      )
    );
    return newsFeed;
  }

  async getNewsFeed(section, country) {
    const newsFeed = await this.client(
      this.helper.getNewsFeedUrlWithQueryString(section, country)
    );
    return newsFeed;
  }

  async getEditorsPick() {
    const editorsPick = await this.client(this.helper.getEditorsPick());
    return editorsPick;
  }
}

class NYTimesAPIHelper {
  getSearchResultsUrlWithQueryString(q, section, country, start, end) {
    const params = new URLSearchParams();
    const FilterQueryArray = [];
    if (q === "" || q === null || q === undefined)
      throw new Error("Search parameter required");
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

    params.append("q", q);

    if (start !== "") {
      params.append("begin_date", start.split("-").join(""));
    }

    if (end !== "") {
      params.append("end_date", end.split("-").join(""));
    }

    return `/svc/search/v2/articlesearch.json?sort=newest&${params.toString()}&${
      FilterQueryArray.length ? "fq=" + FilterQueryArray.join(" OR ") : ""
    }`;
  }

  getNewsFeedUrlWithQueryString(section, country) {
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

    return `/svc/search/v2/articlesearch.json?sort=newest&${
      FilterQueryArray.length ? "fq=" + FilterQueryArray.join(" OR ") : ""
    }`;
  }

  getEditorsPick() {
    return `/svc/topstories/v2/home.json`;
  }
}

export default NYTimesAPIService;

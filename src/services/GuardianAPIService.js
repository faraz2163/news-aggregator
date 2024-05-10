import axios from "axios";

class GuardianAPIService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.helper = new GuardianAPIHelper();
    this.client = axios.create({
      baseURL: "https://content.guardianapis.com/",
      method: "GET",
      params: {
        "api-key": this.apiKey,
        "show-fields": "trailText,headline",
        "show-elements": "image",
        "show-tags": "contributor",
      },
    });
  }

  async getSearchResults(q, country, section, start, end) {
    const newsFeed = await this.client(
      this.helper.getSearchResultsUrlWithQueryString(
        q,
        country,
        section,
        start,
        end
      )
    );
    return newsFeed;
  }

  async getNewsFeed(country, section) {
    const newsFeed = await this.client(
      this.helper.getNewsFeedUrlWIthQueryString(country, section)
    );
    return newsFeed;
  }

  async getEditorsPick() {
    const editorsPick = await this.client(this.helper.getEditorsPickUrl());
    return editorsPick;
  }
}

class GuardianAPIHelper {
  getEditorsPickUrl() {
    return `/search`;
  }
  getNewsFeedUrlWIthQueryString(country, section) {
    const params = new URLSearchParams();

    const sectionForGuardian = section.find((c) => c.sourcefrom === "guardian");
    const countriesForGuardian = [];
    country.forEach((c) => {
      countriesForGuardian.push(c.name);
      if (c.otherNamesForTheCountry.length) {
        c.otherNamesForTheCountry.forEach((o) => {
          countriesForGuardian.push(o);
        });
      }
    });

    if (sectionForGuardian) {
      params.append("section", sectionForGuardian.g_id);
    }
    if (countriesForGuardian.length) {
      params.append("q", countriesForGuardian.join(" OR "));
    }

    return `/search?${params.toString()}`;
  }
  getSearchResultsUrlWithQueryString(q, country, section, start, end) {
    const params = new URLSearchParams();

    if (q === "" || q === null || q === undefined)
      throw new Error("Search parameter required");

    const sectionForGuardian = section.find((c) => c.sourcefrom === "guardian");
    const countriesForGuardian = [];
    country.forEach((c) => {
      countriesForGuardian.push(c.name);
      if (c.otherNamesForTheCountry.length) {
        c.otherNamesForTheCountry.forEach((o) => {
          countriesForGuardian.push(o);
        });
      }
    });

    if (sectionForGuardian) {
      params.append("section", sectionForGuardian.g_id);
    }
    // if (countriesForGuardian.length) {
    params.append("q", q + " AND " + countriesForGuardian.join(" OR "));
    // }

    if (start !== "") {
      params.append("from-date", start);
    }
    if (end !== "") {
      params.append("to-date", end);
    }

    if (start !== "" || end !== "") {
      params.append("use-date", "last-modified");
    }

    return `/search?${params.toString()}`;
  }
}

export default GuardianAPIService;

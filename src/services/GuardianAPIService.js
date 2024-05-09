import axios from "axios";

class GuardianAPIService {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.client = axios.create({
      baseURL: "https://content.guardianapis.com/",
      method: "GET",
      params: {
        "api-key": this.apiKey,
        "show-fields": "trailText,headline",
        "show-elements": "image",
      },
    });
  }

  async getNewsFeed(country, section) {
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

    const newsFeed = await this.client(`/search?${params.toString()}`, {
      params: { "show-tags": "contributor" },
    });
    return newsFeed;
  }

  async getEditorsPick() {
    const editorsPick = await this.client(`/search`, {
      params: { "show-tags": "contributor" },
    });
    return editorsPick;
  }
}

export default GuardianAPIService;

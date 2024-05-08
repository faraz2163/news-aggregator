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

  async getNewsFeed(country = "us") {
    const newsFeed = await this.client(`/search`);
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

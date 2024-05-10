const { v4: uuidv4 } = require("uuid");
export const timeSince = (d) => {
  const date = new Date(d);
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + "y";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hrs";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " min";
  }
  return Math.floor(seconds) + " sec";
};
// Usage
// var aDay = 24 * 60 * 60 * 1000;
// console.log(timeSince(new Date(Date.now() - aDay)));
// console.log(timeSince(new Date(Date.now() - aDay * 2)));

export const setItemLocal = (key, item) => {
  localStorage.setItem(
    key,
    typeof item === "object" ? JSON.stringify(item) : item.toString()
  );
};

export const getItemLocal = (key) => {
  let item;
  try {
    item = localStorage.getItem(key);
    return JSON.parse(item);
  } catch (error) {
    return item;
  }
};

export const generateTimestampId = () => uuidv4();

export const getAuthorName = (authorName, seperator = "") => {
  if (authorName) {
    return <span>{seperator + authorName}</span>;
  }
  return "";
};

export const normalizeNewsData = (arr) =>
  arr.map((a) => {
    return {
      id: generateTimestampId(),
      title: a.title,
      content: a.content,
      source: a.source,
      img: a.urlToImage ? a.urlToImage : undefined,
      author: a.author,
      url: a.url,
      pub_date: a.publishedAt,
    };
  });

export const normalizeGuardianData = (arr) =>
  arr.map((a) => {
    return {
      id: generateTimestampId(),
      title: a.webTitle,
      content: a.fields?.trailText,
      source: { id: a.sectionId, name: a.sectionName },
      img: a.elements?.find((e) => e.relation === "thumbnail")?.assets[0]?.file,
      author: a.tags[0]?.webTitle,
      url: a.webUrl,
      pub_date: a.webPublicationDate,
    };
  });

export const normalizeNYTimesEditorsData = (arr) =>
  arr.map((a) => {
    return {
      id: generateTimestampId(),
      title: a.title,
      content: a.abstract,
      source: { id: a.section_name, name: a.section_name },
      img: a.multimedia?.find((e) => e.format === "threeByTwoSmallAt2X")?.url,
      author: a.byline.substr(3),
      url: a.url,
      pub_date: a.updated_date,
    };
  });

export const normalizeNYTimesSearchData = (arr) =>
  arr.map((a) => {
    let imgurl = a.multimedia?.find(
      (e) => e.subtype === "threeByTwoSmallAt2X"
    )?.url;
    if (!imgurl) {
      imgurl = "";
    }
    return {
      id: generateTimestampId(),
      title: a.headline.main,
      content: a.abstract,
      source: { id: a.section_name, name: a.section_name },
      img: imgurl === "" ? undefined : "https://www.nytimes.com/" + imgurl,
      author: a.byline?.original?.substr(3),
      url: a.web_url,
      pub_date: a.pub_date,
    };
  });

export const getLuceneSyntax = (key, arr) =>
  arr.length ? `${key}: (${arr.map((item) => `"${item}"`).join(", ")})` : null;

export const isDateGreaterThanToday = (date) => {
  const today = new Date();
  const inputDate = new Date(date);
  return inputDate <= today;
};

export const isEndDateValid = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return start <= end;
};

export const isStartDateValid = (date) => {
  const today = new Date();
  const inputDate = new Date(date);
  const oneMonthAgo = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    today.getDate()
  );
  return inputDate >= oneMonthAgo;
};

export const timeSince = (date) => {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " years";
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
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
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

export const generateTimestampId = () => Date.now().toString();

export const normalizeNewsData = (arr) =>
  arr.map((a) => {
    return {
      id: generateTimestampId(),
      title: a.title,
      content: a.content,
      source: a.source,
      img: a.urlToImage,
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
      content: a.fields.trailText,
      source: { id: a.sectionId, name: a.sectionName },
      img: a.elements.find((e) => e.relation === "thumbnail").assets[0].file,
      contributor: a.tags[0].webTitle,
      url: a.webUrl,
      pub_date: a.webPublicationDate,
    };
  });

export const normalizeNYTimesData = (arr) =>
  arr.map((a) => {
    return {
      id: generateTimestampId(),
      title: a.title,
      content: a.abstract,
      source: { id: a.section, name: a.section },
      img: a.multimedia.find((e) => e.format === "threeByTwoSmallAt2X").url,
      author: a.byline.substr(3),
      url: a.url,
      pub_date: a.updated_date,
    };
  });

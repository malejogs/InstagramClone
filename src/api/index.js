const APIKEY = '16713911-3f0e204e49fb82f31f0481257';
const url = 'https://pixabay.com/api/';
const generalConfig = `key=${APIKEY}&pretty=true&editors_choice=true`;

export const getPhotos = async (page = 1, itemsPerPage = 20) => {
  try {
    const photosApi = await fetch(
      `${url}?${generalConfig}&image_type=photo&page=${page}&per_page=${itemsPerPage}`,
    );
    let photos = await photosApi.json();
    return photos.hits;
  } catch (error) {
    return [];
  }
};

export const getVideos = async (page = 1, itemsPerPage = 20) => {
  try {
    const videosApi = await fetch(
      `${url}/videos/?${generalConfig}&page=${page}&per_page=${itemsPerPage}`,
    );
    let videos = await videosApi.json();
    return videos.hits;
  } catch (error) {
    return [];
  }
};

export const getFakeDataFeed = async (page = 1) => {
  const photos = await getPhotos(page);
  const videos = await getVideos(page);
  const allMedia = [...photos, ...videos];
  allMedia.sort((a, b) => 0.5 - Math.random());
  const media = [];
  for (let i = 0; i < 10; i++) {
    const data = allMedia.splice(0, 4);
    data.length = Math.floor(Math.random() * 4) + 1;
    media.push(data);
  }
  return media;
};

export const getFakeDataStories = async (page = 1) => {
  const photos = await getPhotos(page);
  const stories = photos.map(({id, webformatURL, userImageURL, user}) => ({
    id,
    image: webformatURL,
    user: user,
    avatar: userImageURL,
    time: Math.floor(Math.random() * 23) + 1,
  }));
  return stories;
};

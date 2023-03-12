export default class Youtube {
  // DI(의존성주입)
  constructor(apiClient) {
    this.apiClient = apiClient;
  }

  async search(keyword) {
    return keyword ? this.#searchKeyword(keyword) : this.#popularVideos();
  }

  async channelImgURL(id) {
    return this.apiClient
      .channels({
        params: {
          part: ['snippet', 'statistics', 'contentDetails'],
          id,
        },
      })
      .then((res) => res.data.items[0].snippet.thumbnails.default.url);
  }

  async channelDetail(id) {
    return this.apiClient
      .channels({
        params: {
          part: ['snippet', 'statistics', 'contentDetails'],
          id,
        },
      })
      .then((res) => res.data.items[0]);
  }

  async videoDetail(videoId) {
    return this.apiClient
      .videoDetail({
        params: {
          part: ['snippet', 'statistics', 'contentDetails'],
          videoId,
        },
      })
      .then((res) => res.items.snippet);
  }

  async relatedVideos(id) {
    return this.apiClient
      .search({
        params: {
          part: 'snippet',
          maxResults: 10,
          type: 'video',
          relatedToVideoId: id,
        },
      })
      .then((res) =>
        res.data.items.map((item) => ({ ...item, id: item.id.videoId }))
      );
  }

  async commentThreads(videoId) {
    return this.apiClient
      .commentThreads({
        params: {
          part: 'snippet',
          videoId,
        },
      })
      .then((res) => res.data.items);
  }

  async #searchKeyword(keyword) {
    return this.apiClient
      .search({
        params: {
          part: 'snippet',
          maxResults: 10,
          type: 'video',
          q: keyword,
        },
      })
      .then((res) => res.data.items)
      .then((items) => items.map((item) => ({ ...item, id: item.id.videoId })));
  }

  async #popularVideos() {
    return this.apiClient
      .videos({
        params: {
          part: 'snippet',
          maxResults: 25,
          chart: 'mostPopular',
        },
      })
      .then((res) => res.data.items);
  }
}

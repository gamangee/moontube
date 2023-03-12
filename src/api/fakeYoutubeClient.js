import axios from 'axios';

export default class FakeYoutubeClient {
  async search({ params }) {
    return params.relatedToVideoId
      ? axios.get('/data/related.json')
      : axios.get('/data/search.json');
  }

  async videos() {
    return axios.get('/data/popular.json');
  }

  async channels() {
    return axios.get('/data/channelDetail.json');
  }

  async commentThreads() {
    return axios.get('/data/comments.json');
  }

  async videoDetail() {
    return axios.get('/data/videoDetail.json');
  }
}

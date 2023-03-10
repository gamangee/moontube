import axios from 'axios';

export default class YoutubeClient {
  constructor() {
    // 기본적인 url과 사용하는 key 설정
    // axios 통신을 할 때 필요한 기본적인 세팅해서 인스턴스 만들기(초기화)
    this.httpClient = axios.create({
      baseURL: 'https://youtube.googleapis.com/youtube/v3',
      params: {
        key: process.env.REACT_APP_API_KEY,
      },
    });
  }

  async search(params) {
    return this.httpClient.get('search', params);
  }

  async videos(params) {
    return this.httpClient.get('videos', params);
  }
}

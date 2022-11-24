import axios from 'axios';
import _ from 'lodash';
import parseRSS from '../parserRSS.js';

const handlerOfLoadingRSS = (state, url) => {
  const rssUrl = new URL(`https://allorigins.hexlet.app/get?disableCache=true&url=${url}`);
  axios.get(rssUrl.toString())
    .then((response) => {
      const parsedResponse = parseRSS(response.data.contents);
      const { feed, posts } = parsedResponse;
      const feedId = _.uniqueId();
      state.loadingRSS.feeds = [{ ...feed, id: feedId, url }, ...state.loadingRSS.feeds];
      const newPosts = posts.map((post) => {
        const postId = _.uniqueId();
        return { ...post, id: postId, feedId };
      });
      state.loadingRSS.posts = [...newPosts, ...state.loadingRSS.posts];
      state.process = 'loaded';
    })
    .catch((e) => {
      state.loadingRSS.error = e.message;
      state.process = 'error';
    });
};

export default handlerOfLoadingRSS;

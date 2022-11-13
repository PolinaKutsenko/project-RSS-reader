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
      state.loadingRSS.feeds = [{ ...feed, id: feedId }, ...state.loadingRSS.feeds];
      const newPosts = posts.map((post) => {
        const postId = _.uniqueId();
        return { ...post, id: postId, feedId };
      });
      state.loadingRSS.posts = [...newPosts, ...state.loadingRSS.posts];
      state.loadingRSS.resources.push({ feedId, url });
      state.process = 'loaded';
      state.feedbackMessageKey = 'loading.isLoaded';
      state.loadingRSS.updatingPosts.errorUpdating = null;
    })
    .catch((e) => {
      state.process = 'error';
      switch (e.message) {
        case 'Parsing RSS Error':
          state.feedbackMessageKey = 'loading.errors.resourseError';
          break;
        case 'Network Error':
          state.loadingRSS.errors.push(e);
          state.feedbackMessageKey = 'loading.errors.networkErrror';
          break;
        default:
          throw new Error(e.message);
      }
    });
};

export default handlerOfLoadingRSS;

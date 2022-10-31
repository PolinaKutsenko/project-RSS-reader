import axios from 'axios';
import _ from 'lodash';
import parseRSS from '../parserRSS.js';
import timer from './updateHandler.js';

const handlerOfLoadingRSS = (state, url) => {
  const rssUrl = new URL(`https://allorigins.hexlet.app/get?disableCache=true&url=${url}`);
  axios.get(rssUrl.toString())
    .catch((e) => {
      state.loadingRSS.errors.push(e);
      throw new Error(state.i18n.t('loading.errors.networkErrror'));
    })
    .then((response) => {
      const parsedResponse = parseRSS(response.data.contents);
      state.process = 'parsing';
      return parsedResponse;
    })
    .catch((e) => {
      if (e.message === 'Parsing RSS Error') {
        throw new Error(state.i18n.t('loading.errors.resourseError'));
      }
      throw new Error(e.message);
    })
    .then((parsedResponse) => {
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
      state.feedbackMessage = state.i18n.t('loading.isLoaded');
      state.loadingRSS.updatingPosts.errorUpdating = null;
    })
    .then(() => {
      timer(state);
      console.log('first timer go', state);
    })
    .catch((error) => {
      state.feedbackMessage = error.message;
    });
};

export default handlerOfLoadingRSS;

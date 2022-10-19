import axios from 'axios';
import _ from 'lodash';
import parseRSS from '../parserRSS.js';

const handlerOfLoadingRSS = (state, url) => {
  const rssUrl = new URL(`https://allorigins.hexlet.app/get?disableCache=true&url=${url}`);
  axios.get(rssUrl.toString())
    .catch((e) => {
      state.loadingRSS.errors.push(e);
      state.feedbackMessage = state.i18n.t('loading.errors.networkErrror');
      console.log(e);
    })
    .then((response) => {
      console.log(response);
      console.log(state);
      const parsedResponse = parseRSS(response.data.contents);
      console.log('after parse');
      console.log(parsedResponse);
      return parsedResponse;
    })
    .catch((e) => {
      if (e.message === 'Parsing RSS Error') {
        state.feedbackMessage = state.i18n.t('loading.errors.resourseError');
      }
    })
    .then((parsedResponse) => {
      console.log('start_id');
      const { feed, posts } = parsedResponse;
      feed.id = _.uniqueId();
      state.loadingRSS.feeds.push(feed);
      console.log(parsedResponse.posts);
      const newPosts = posts.forEach((post) => {
        post.id = _.uniqueId();
        post.feedId = feed.id;
      });
      state.loadingRSS.posts = [...state.loadingRSS.posts, ...newPosts];
      state.loadingRSS.uiState.activeFeedId = feed.id;
      console.log('last', state);
    });
};

export default handlerOfLoadingRSS;

import axios from 'axios';
import _ from 'lodash';
import parserRSS from '../parserRSS.js';

const handlerOfLoadingRSS = (state, url) => {
  const rssUrl = new URL(`https://allorigins.hexlet.app/get?disableCache=true&url=${url}`);
  console.log(rssUrl);
  axios.get(rssUrl.toString())
    .catch((e) => {
      state.loadingRSS.errors.push(e);
      state.feedbackMessage = state.i18n.t('loading.networkErrror');
      console.log(e);
    })
    .then((response) => {
      console.log(response);
      console.log(response.data.contents);
      const parsedResponse = parserRSS(response.data.contents);
      console.log(parsedResponse);
      return parsedResponse;
    })
    .then((parsedResponse) => {
      const newFeed = parsedResponse.feed;
      newFeed.id = _.uniqueId();
      state.loadingRSS.feeds.push(newFeed);
      const newPosts = parsedResponse.posts.forEach((post) => {
        post.id = _.uniqueId();
        post.feedId = newFeed.id;
      });
      state.loadingRSS.posts = [...state.loadingRSS.posts, ...newPosts];
      state.loadingRSS.uiState.activeFeedId = newFeed.id;
      console.log(state);
    });
};

export default handlerOfLoadingRSS;

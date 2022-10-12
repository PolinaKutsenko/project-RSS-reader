import axios from 'axios';
import _ from 'lodash';
import parserRSS from '../parserRSS.js';

const handlerOfLoadingRSS = (state, url) => {
  const rssUrl = new URL(`https://allorigins.hexlet.app/get?disableCache=true&url=${url}`);
  axios.get(rssUrl)
    .then((response) => {
      console.log('axios');
      console.log(response);
      console.log(typeof response.data.contents);
      console.log('axios');
      const parserResponse = parserRSS(response.data.contents);
      console.log(parserResponse);
      const newFeed = parserResponse.feed;
      newFeed.id = _.uniqueId();
      console.log(newFeed.id);
      state.feeds.push(newFeed);
      const newPosts = parserResponse.posts.forEach((post) => {
        post.id = _.uniqueId();
        post.feedId = newFeed.id;
      });
      state.posts = [...state.posts, ...newPosts];
      state.activeFeedId = newFeed.id;
      console.log(state);
    })
    .catch((e) => {
      throw new Error('Network error');
    });
};

export default handlerOfLoadingRSS;

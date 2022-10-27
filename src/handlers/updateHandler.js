import axios from 'axios';
import _ from 'lodash';
import parseRSS from '../parserRSS.js';

const updatingRSS = (state) => {
  console.log('going updatingRSS');
  const { posts: oldPosts, feeds: oldFeeds } = state.loadingRSS;
  const promises = state.loadingRSS.resources.map((resource) => {
    const rssUrl = new URL(`https://allorigins.hexlet.app/get?disableCache=true&url=${resource.url}`);
    return axios.get(rssUrl.toString())
      .catch(() => {
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
      });
  });

  Promise.all(promises)
    .catch((error) => {
      console.log('Error in promise.all', error.message);
      throw new Error(error.message);
    })
    .then((parsedResponses) => {
      parsedResponses.forEach((parsedResponse) => {
        const { feed, posts } = parsedResponse;
        const [currentFeed] = oldFeeds.filter((feedItem) => feedItem.title === feed.title);
        const currentfeedId = currentFeed.id;
        const existedPosts = oldPosts.filter((post) => post.feedId === currentfeedId);
        const existedPostsTitle = existedPosts.map((post) => post.postTitle);
        const newPosts = posts.filter((post) => !existedPostsTitle.includes(post.postTitle));
        if (!_.isEmpty(newPosts)) {
          const newPostsWithId = newPosts.map((post) => {
            const postId = _.uniqueId();
            return { ...post, id: postId, feedId: currentfeedId };
          });
          state.loadingRSS.posts = [...state.loadingRSS.posts, ...newPostsWithId];
        }
        state.process = 'loaded';
        console.log('finished updating');
      });
    })
    .then(() => {
      state.loadingRSS.updatingPosts.errorUpdating = false;
      console.log('change errorUpdating', state);
    })
    .catch((e) => {
      state.loadingRSS.updatingPosts.errorUpdating = e.message;
    });
};

const timer = (state) => {
  console.log('timer', state);
  const timerId = setTimeout(() => {
    updatingRSS(state);
    state.loadingRSS.updatingPosts.currentTimerID = timerId;
  }, 5000);
  if (state.loadingRSS.updatingPosts.errorUpdating) {
    clearTimeout(state.loadingRSSupdatingPosts.currentTimerID);
  }
};

export default timer;

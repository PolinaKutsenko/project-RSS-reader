import axios from 'axios';
import _ from 'lodash';
import parseRSS from '../parserRSS.js';

const updatingRSS = (state, i18n) => {
  const { posts: oldPosts, feeds: oldFeeds } = state.loadingRSS;
  const promises = state.loadingRSS.resources.map((resource) => {
    const rssUrl = new URL(`https://allorigins.hexlet.app/get?disableCache=true&url=${resource.url}`);
    return axios.get(rssUrl.toString())
      .catch(() => {
        throw new Error('loading.errors.networkErrror');
      })
      .then((response) => {
        const parsedResponse = parseRSS(response.data.contents);
        return parsedResponse;
      })
      .catch((e) => {
        if (e.message === 'Parsing RSS Error') {
          throw new Error('loading.errors.resourseError');
        }
        throw new Error(e.message);
      });
  });

  const promise = Promise.all(promises)
    .then((parsedResponses) => {
      state.process = 'updating';
      parsedResponses.forEach((parsedResponse) => {
        const { feed, posts } = parsedResponse;
        const { id: currentfeedId } = oldFeeds.find((feedItem) => feedItem.title === feed.title);
        const oldPostsOfCurrentFeedWithoutId = oldPosts.filter((post) => (
          post.feedId === currentfeedId))
          .map((post) => (
            {
              postTitle: post.postTitle,
              postDescription: post.postDescription,
              postLink: post.postLink,
              postPubDate: post.postPubDate,
            }));
        const newPosts = _.differenceWith(posts, oldPostsOfCurrentFeedWithoutId, _.isEqual);
        const newPostsWithId = newPosts.map((post) => {
          const postId = _.uniqueId();
          return { feedId: currentfeedId, id: postId, ...post };
        });
        state.loadingRSS.posts = [...newPostsWithId, ...state.loadingRSS.posts];
        state.loadingRSS.updatingPosts.errorUpdating = false;
        state.process = 'loaded';
      });
    })
    .catch((e) => {
      state.loadingRSS.updatingPosts.errorUpdating = e.message;
      throw new Error(e.message);
    });
  return promise;
};

const timer = (state, i18n) => {
  if (!state.loadingRSS.updatingPosts.errorUpdating) {
    const timerId = setTimeout(() => {
      updatingRSS(state, i18n)
        .then(() => {
          state.loadingRSS.updatingPosts.currentTimerID = timerId;
          timer(state, i18n);
        })
        .catch((e) => {
          clearTimeout(state.loadingRSS.updatingPosts.currentTimerID);
          state.process = 'error';
          state.feedbackMessageKey = e.message;
        });
    }, 5000);
  }
};

export default timer;

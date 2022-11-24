import axios from 'axios';
import _ from 'lodash';
import parseRSS from '../parserRSS.js';

const updatingRSS = (state) => {
  const { posts: oldPosts, feeds: oldFeeds } = state.loadingRSS;
  const promises = state.loadingRSS.feeds.map((resource) => {
    const rssUrl = new URL(`https://allorigins.hexlet.app/get?disableCache=true&url=${resource.url}`);
    return axios.get(rssUrl.toString())
      .then((response) => {
        const parsedResponse = parseRSS(response.data.contents);
        return parsedResponse;
      })
      .catch((e) => {
        throw new Error(e.message);
      });
  });

  const promise = Promise.all(promises)
    .then((parsedResponses) => {
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
        state.loadingRSS.updatingPosts.errorUpdating = null;
      });
    })
    .catch((e) => {
      state.loadingRSS.updatingPosts.errorUpdating = e.message;
    });
  return promise;
};

const timer = (state) => {
  // console.log('timer', state);
  const timerId = setTimeout(() => {
    updatingRSS(state)
      .then(() => {
        state.loadingRSS.updatingPosts.currentTimerID = timerId;
        timer(state);
      });
  }, 5000);
};

export default timer;

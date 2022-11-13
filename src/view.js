import onChange from 'on-change';
import { formRender, feedbackMessageRender } from './renders/formRender.js';
import renderResponse from './renders/responseRender.js';
import { openPostLinkHandler, viewModalOpenHandler } from './handlers/modalHandler.js';
import buildModal from './renders/modalRender.js';

const watcher = (state, i18n) => {
  const watchedState = onChange(state, (path) => {
    if (path === 'validation') {
      formRender(watchedState);
    }
    if (path === 'feedbackMessageKey') {
      feedbackMessageRender(watchedState, i18n);
    }
    if (path === 'loadingRSS.feeds') {
      renderResponse(watchedState, i18n);
      openPostLinkHandler(watchedState);
      viewModalOpenHandler(watchedState);
    }
    if (path === 'loadingRSS.posts' || path === 'loadingRSS.uiState.viewedPostsId') {
      renderResponse(watchedState, i18n);
      openPostLinkHandler(watchedState);
      viewModalOpenHandler(watchedState);
    }
    if (path === 'loadingRSS.uiState.currentModal') {
      buildModal(watchedState);
    }

    //    switch (path) {
    //      case ('validation'):
    //        formRender(watcher);
    //        break;
    //      case ('feedbackMessage'):
    //       feedbackMessageRender(watcher);
    //        break;
    //      case ('loadingRSS.feeds'):
    //     case ('loadingRSS.posts'):
    //     case ('loadingRSS.uiState.viewedPostsId'):
    //       renderResponse(watcher);
    //       openPostLinkHandler(watcher);
    //       viewModalOpenHandler(watcher);
    //       break;
    //     case ('loadingRSS.uiState.currentModal'):
    //       buildModal(watcher);
    //       break;
  //    case ('loadingRSS.updatingPosts.currentTimerID'):
  //      timer(watcher);
  //      break;
  //    default:
  //      throw new Error('error in watcher');
    //   }
  });
  return watchedState;
};

export default watcher;

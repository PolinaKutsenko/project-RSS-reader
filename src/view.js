import onChange from 'on-change';
import { formRender, feedbackMessageRender } from './renders/formRender.js';
import renderResponse from './renders/responseRender.js';
import { openPostLinkHandler, viewModalOpenHandler } from './handlers/modalHandler.js';
import buildModal from './renders/modalRender.js';
import timer from './handlers/updateHandler.js';

const watchedState = (state) => {
  const watcher = onChange(state, (path) => {
    switch (path) {
      case ('validation'):
        formRender(watcher);
        break;
      case ('feedbackMessage'):
        feedbackMessageRender(watcher);
        break;
      case ('loadingRSS.feeds'):
      case ('loadingRSS.posts'):
      case ('loadingRSS.uiState.viewedPostsId'):
        renderResponse(watcher);
        openPostLinkHandler(watcher);
        viewModalOpenHandler(watcher);
        break;
      case ('loadingRSS.uiState.currentModal'):
        buildModal(watcher);
        break;
      case ('loadingRSS.updatingPosts.currentTimerID'):
        timer(watcher);
        break;
      default:
        throw new Error('error in watcher');
    }
  });
  return watcher;
};

export default watchedState;

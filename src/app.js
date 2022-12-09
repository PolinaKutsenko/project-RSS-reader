import 'bootstrap';
import i18next from 'i18next';
import './style.scss';
import resources from './locales/ruAndEnLocales.js';
import watcher from './view.js';
import {
  submitFormHandler, timer, postHandlers, switchLanguageHandler,
} from './handlers.js';

const app = () => {
  const state = {
    process: 'initialization',
    language: 'ru',
    validation: {
      status: 'Valid',
      error: null,
    },
    loadingRSS: {
      error: null,
      feeds: [],
      posts: [],
      uiState: {
        viewedPostsId: [],
        currentModal: null,
      },
      updatingPosts: {
        currentTimerID: null,
        errorUpdating: null,
      },
    },
  };
  const i18n = i18next.createInstance();
  i18n.init({
    lng: 'ru',
    debug: true,
    resources: {
      ru: resources.ru,
      en: resources.en,
    },
  })
    .then(() => {
      const watchedState = watcher(state, i18n);
      submitFormHandler(watchedState);
      postHandlers(watchedState);
      switchLanguageHandler(watchedState);
      timer(watchedState);
    })
    .catch((e) => console.log(e, 'error in init i18next'));
};

export default app;

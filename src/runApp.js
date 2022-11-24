import 'bootstrap';
import i18next from 'i18next';
import './style.scss';
import resources from './locales/ruAndEnLocales.js';
import watcher from './view.js';
import submitFormHandler from './handlers/submitFormHandler.js';
import timer from './handlers/updateHandler.js';
import { switchLanguageHandler } from './handlers/modalHandler.js';

const runApp = () => {
  const state = {
    process: 'init',
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
      switchLanguageHandler(watchedState);
      timer(watchedState);
    })
    .catch((e) => console.log(e, 'error in init i18next'));
};

runApp();

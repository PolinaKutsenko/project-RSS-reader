import 'bootstrap';
import i18next from 'i18next';
import './style.scss';
import resources from './locales/ruAndEnLocales.js';
import watchedState from './view.js';
import submitFormHandler from './handlers/submitFormHandler.js';

const runApp = () => {
  const promise = new Promise((resolve) => {
    const i18nextInstance = i18next.createInstance();
    i18nextInstance.init({
      lng: 'ru',
      debug: true,
      resources: {
        ru: resources.ru,
        en: resources.en,
      },
    });
    resolve(i18nextInstance);
  });
  promise.then((i18nextInstance) => {
    const state = {
      i18n: i18nextInstance,
      process: null,
      feedbackMessage: null,
      validation: null,
      loadingRSS: {
        errors: [],
        feeds: [],
        posts: [],
        resources: [],
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
    return state;
  })
    .then((state) => {
      const watcher = watchedState(state);
      submitFormHandler(watcher);
    })
    .catch((e) => console.log(e, 'error in init i18next'));
};

runApp();

import i18next from 'i18next';
import './style.scss';
import app from './app.js';

const runApp = () => {
  const promise = new Promise((resolve) => {
    const i18nextInstance = i18next.createInstance();
    i18nextInstance.init({
      lng: 'ru',
      debug: true,
      resources: {
        ru: {
          translation: {
            validation: {
              errors: {
                notURL: 'Ссылка должна быть валидным URL',
                existFeed: 'RSS уже существует',
              },
              isValid: 'RSS загружается',
            },
            loading: {
              errors: {
                networkErrror: 'Ошибка сети',
                resourseError: 'Ресурс не содержит валидный RSS',
              },
              isLoaded: 'RSS успешно загружен',
            },
            content: {
              feed: 'Фиды',
              post: 'Посты',
              view: 'Просмотр',
            },
          },
        },
      },
    });
    resolve(i18nextInstance);
  });
  promise.then((i18nextInstance) => {
    const state = {
      i18n: i18nextInstance,
      feedbackMessage: null,
      validation: {
        validateForm: null,
        RSSurl: [],
      },
      loadingRSS: {
        errors: [],
        feeds: [],
        posts: [],
        uiState: {
          viewedPostsId: [],
          currentModal: null,
          activeFeedId: null,
        },
      },
    };
    return state;
  })
    .then((state) => app(state))
    .catch((e) => console.log(e, 'error in init i18next'));
};

runApp();

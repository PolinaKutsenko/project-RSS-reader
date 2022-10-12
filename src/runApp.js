import i18next from 'i18next';
import './style.scss';
import app from './app.js';

const runApp = () => {
  const promise = new Promise((resolve) => {
    const i18nextInstance = i18next.createInstance();
    i18nextInstance.init({
      lng: 'en',
      debug: true,
      resources: {
        en: {
          translation: {
            validation: {
              errors: {
                notURL: 'Ссылка должна быть валидным URL',
                existFeed: 'RSS уже существует',
              },
              succesfull: 'RSS успешно загружен',
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
      validateForm: null,
      validateError: null,
      feeds: [],
      posts: [],
      RSSurl: [],
      activeFeedId: null,
    };
    return state;
  })
    .then((state) => app(state))
    .catch((e) => console.log(e, 'error in init i18next'));
};

runApp();

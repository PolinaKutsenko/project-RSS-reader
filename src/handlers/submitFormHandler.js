import validateForm from '../validateSchema.js';
import handlerOfLoadingRSS from './handlerOfLoadingRSS';

const submitFormHandler = (state) => {
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const value = formData.get('url');

    validateForm(value, state)
      .catch(({ errors }) => {
        const [error] = errors;
        throw new Error(error);
      })
      .then((url) => {
        const resources = state.loadingRSS.resources.map((resourсe) => resourсe.url);
        if (resources.includes(url)) {
          state.process = 'validation';
          throw new Error(state.i18n.t('validation.errors.existFeed'));
        }
        return url;
      })
      .then((url) => {
        state.validation = 'valid';
        state.process = 'validation';
        return url;
      })
      .catch((error) => {
        console.log(state);
        state.validation = 'invalid';
        console.log(state);
        throw new Error(error.message);
      })
      .then((url) => {
        handlerOfLoadingRSS(state, url);
      })
      .catch((error) => {
        state.feedbackMessage = error.message;
      });
  });
};

export default submitFormHandler;

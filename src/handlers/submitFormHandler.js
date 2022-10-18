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
        const isExistedURL = state.validation.RSSurl.includes(url);
        if (isExistedURL) {
          throw new Error(state.i18n.t('validation.errors.existFeed'));
        }
        return url;
      })
      .then((url) => {
        state.validation.RSSurl.push(url);
        state.validation.validateForm = 'valid';
        state.feedbackMessage = state.i18n.t('validation.isValid');
        return url;
      })
      .then((url) => {
        handlerOfLoadingRSS(state, url);
      })
      .catch((error) => {
        state.validation.validateForm = 'invalid';
        state.feedbackMessage = error.message;
      });
  });
};

export default submitFormHandler;

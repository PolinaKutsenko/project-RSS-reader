const formRender = (watchedState) => {
  const input = document.querySelector('#url-input');
  const form = document.querySelector('form');

  if (watchedState.validation.status === 'invalid') {
    input.classList.add('is-invalid');
  }
  if (watchedState.validation.status === 'valid') {
    input.classList.remove('is-invalid');
    form.reset();
    form.elements.url.focus();
  }
};

const feedbackMessageRender = (state, i18n) => {
  const feedback = document.querySelector('p.feedback');
  feedback.classList.remove('text-success');
  feedback.classList.remove('text-danger');

  let feedbackMessageKey;

  if (state.process === 'loaded') {
    console.log('loaded');
    feedback.classList.add('text-success');
    feedbackMessageKey = 'loading.isLoaded';
  }
  if (state.process === 'error') {
    feedback.classList.add('text-danger');
    if (state.validation.error) {
      switch (state.validation.error) {
        case 'url':
          feedbackMessageKey = 'validation.errors.notURL';
          break;
        case 'min':
          feedbackMessageKey = 'validation.errors.minLength';
          break;
        case 'notOneOf':
          feedbackMessageKey = 'validation.errors.existFeed';
          break;
        default:
          throw new Error('Unknown error in validation');
      }
    }
    if (state.loadingRSS.error) {
      switch (state.loadingRSS.error) {
        case 'Parsing RSS Error':
          feedbackMessageKey = 'loading.errors.resourseError';
          break;
        case 'Network Error':
          feedbackMessageKey = 'loading.errors.networkErrror';
          break;
        default:
          throw new Error('Unknown error in loading');
      }
    }
  }
  feedback.textContent = i18n.t(`${feedbackMessageKey}`);
};

export { formRender, feedbackMessageRender };

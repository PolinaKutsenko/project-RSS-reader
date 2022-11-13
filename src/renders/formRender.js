const formRender = (watchedState) => {
  const input = document.querySelector('#url-input');
  const form = document.querySelector('form');

  if (watchedState.validation === 'invalid') {
    input.classList.add('is-invalid');
  }
  if (watchedState.validation === 'valid') {
    input.classList.remove('is-invalid');
    form.reset();
    form.elements.url.focus();
  }
};

const feedbackMessageRender = (state, i18n) => {
  const feedback = document.querySelector('p.feedback');
  console.log(state.feedbackMessageKey);
  console.log(i18n.t(`${state.feedbackMessageKey}`));
  feedback.textContent = i18n.t(`${state.feedbackMessageKey}`);
  feedback.classList.remove('text-success');
  feedback.classList.remove('text-danger');
  if (state.process === 'loaded' && state.validation === 'valid') {
    feedback.classList.add('text-success');
    return;
  }
  if (state.process === 'error') {
    feedback.classList.add('text-danger');
  }
};

export { formRender, feedbackMessageRender };

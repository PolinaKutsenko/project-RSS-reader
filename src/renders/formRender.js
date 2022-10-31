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

const feedbackMessageRender = (state) => {
  const feedback = document.querySelector('p.feedback');
  feedback.textContent = state.feedbackMessage;
  feedback.classList.remove('text-success');
  feedback.classList.remove('text-danger');
  if (state.process === 'loaded' && state.validation === 'valid') {
    feedback.classList.add('text-success');
    return;
  }
  feedback.classList.add('text-danger');
};

export { formRender, feedbackMessageRender };

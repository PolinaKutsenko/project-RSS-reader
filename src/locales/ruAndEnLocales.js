const ru = {
  translation: {
    validation: {
      errors: {
        notURL: 'Ссылка должна быть валидным URL',
        existFeed: 'RSS уже существует',
        minLength: 'Не должно быть пустым',
      },
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
};

const en = {
  translation: {
    validation: {
      errors: {
        notURL: 'Link must be a valid URL',
        existFeed: 'RSS already exists',
        minLength: 'Must not be empty',
      },
    },
    loading: {
      errors: {
        networkErrror: 'Network error',
        resourseError: 'The resource does not contain valid RSS',
      },
      isLoaded: 'RSS uploaded successfully',
    },
    content: {
      feed: 'Feeds',
      post: 'Posts',
      view: 'View',
    },
  },
};

export default { en, ru };

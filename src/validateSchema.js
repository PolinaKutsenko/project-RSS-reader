import * as yup from 'yup';
import { setLocale } from 'yup';

const validateForm = (value, state) => {
  setLocale({
    string: {
      url: state.i18n.t('validation.errors.notURL'),
    },
  });
  const schema = yup.string().url().notOneOf(state.validation.RSSurl);
  return schema.validate(value);
};
export default validateForm;

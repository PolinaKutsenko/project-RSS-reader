import * as yup from 'yup';

const validateForm = (value, resources) => {
  const schema = yup.string().url().min(5).notOneOf(resources);
  return schema.validate(value);
};
export default validateForm;

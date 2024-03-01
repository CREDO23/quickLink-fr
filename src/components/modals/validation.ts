import * as joi from 'joi';

const defaultValues = {
  url: '',
};

const createLinkSchema = joi
  .object({
    url: joi
      .string()
      .required()
      .regex(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/)
      .messages({
        'any.regex': 'You must provide a valid url',
        'any.required': 'The url is required',
      }),
  })
  .required()
  .messages({
    'any.required': 'You must provide link information',
  });

export { defaultValues, createLinkSchema };

import * as joi from 'joi';

const defaultValues = {
  username: '',
  password: '',
};

const loginSchema = joi.object({
  username: joi.string().required().min(5).messages({
    'any.required': 'The name is required',
    'any.min': 'The name must be at least 5 characters',
  }),
    password: joi.string().required().min(5).messages({
      'any.required': 'The passowrd is required',
      'any.min': 'The password must be at least 5 characters',
    }),
  }) ;


export {defaultValues , loginSchema}
import boom from '@hapi/boom';
import joi from 'joi';

const validate = (data: any, schema: any) => {
  const { error } = joi.object(schema).validate(data);
  return error;
}

const validationHandler = (schema: any, check = "body") => {
  return (req: any, res: any, next: any) => {
    const error = validate(req[check], schema);
    error ? next(boom.badRequest(error.message)) : next();
  }
}

export default validationHandler;


import { createParamDecorator } from '@nestjs/common';

export const Me = createParamDecorator((prop, req) => {
  return prop ? req.user && req.user[prop] : req.user;
});

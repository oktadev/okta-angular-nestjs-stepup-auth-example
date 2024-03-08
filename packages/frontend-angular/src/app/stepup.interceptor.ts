import { HttpInterceptorFn } from '@angular/common/http';

export const stepupInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};

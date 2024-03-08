import { HttpErrorResponse, HttpInterceptorFn, HttpStatusCode } from '@angular/common/http';
import { throwError, catchError } from 'rxjs';

const handleError = (httpError: HttpErrorResponse) => {
  const allowedOrigins = ['/api'];
  if (httpError.status !== HttpStatusCode.Unauthorized || !allowedOrigins.find(origin => httpError.url?.includes(origin))) {
    return throwError(() => httpError);
  }

  let returnError: HttpErrorResponse| {error: string, acr_values: string} = httpError;
  const authResponse = httpError.headers.get('WWW-Authenticate') ?? '';
  if (!authResponse) {
    return throwError(() => returnError);
  }

  console.log('interceptor ', authResponse)
  const {error, acr_values} = Object.fromEntries((authResponse.replace('Bearer ', '').split(',') ?? []).map(el => el.replaceAll('"', '').split('=')));

  if (error === 'insufficient_user_authentication') {
    returnError = {error, acr_values};
  }

  return throwError(() => returnError)
};

export const stepupInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(catchError(handleError));
};

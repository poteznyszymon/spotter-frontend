import { HttpInterceptorFn } from '@angular/common/http';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const apiUrl = (import.meta as any).env?.['NG_API_URL'] ?? 'http://localhost:8080';
  const apiReq = req.clone({ url: `${apiUrl}${req.url}` });
  return next(apiReq);
};

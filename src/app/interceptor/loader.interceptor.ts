import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';

import { LoaderService } from '../shared/loader/loader.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loaderService: LoaderService, private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.router.url.includes('/character-detail')) {
      return next.handle(request);
    }

    this.loaderService.showLoader();

    return next.handle(request).pipe(
      finalize(() => this.loaderService.hideLoader())
    );

  }
}

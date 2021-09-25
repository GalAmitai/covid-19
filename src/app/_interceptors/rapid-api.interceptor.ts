import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable()
export class RapidInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let headers: HttpHeaders = request.headers;

        if (environment.header_x_rapid_host) {
            headers = headers.set('x-rapidapi-host', environment.header_x_rapid_host);
        }

        if (environment.header_x_rapid_key) {
            headers = headers.set('x-rapidapi-key', environment.header_x_rapid_key);
        }

        request = request.clone({headers});
        return next.handle(request);
    }

}
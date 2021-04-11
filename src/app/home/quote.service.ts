import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { RandomQuoteContext, Users } from '@app/models';

const routes = {
  quote: (c: RandomQuoteContext) => `/jokes/random?category=${c.category}`,
  url: 'http://localhost:3000/users',
};

@Injectable({
  providedIn: 'root',
})
export class QuoteService {
  constructor(private httpClient: HttpClient) {}

  getRandomQuote(context: RandomQuoteContext): Observable<string> {
    return this.httpClient.get(routes.quote(context)).pipe(
      map((body: any) => body.value),
      catchError(() => of('Error, could not load joke :-('))
    );
  }

  getUsers(): Observable<any> {
    return this.httpClient
      .get<Users>(routes.url, {
        observe: 'body',
      })
      .pipe(catchError(() => of('Error, could nor load Users Table')));
  }

  deleteUser(id: number): Observable<any> {
    return this.httpClient
      .delete<Users>(routes.url + '/' + id, {
        observe: 'body',
      })
      .pipe(catchError(() => of('Error, not deleted')));
  }
}

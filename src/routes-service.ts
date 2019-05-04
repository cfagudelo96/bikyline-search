import { Injectable, HttpService } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Route } from './shared/route';

@Injectable()
export class RoutesService {
  constructor(private readonly httpService: HttpService) { }

  getRoutes(app: string): Observable<Route[]> {
    return this.httpService
      .get(
        'https://46idh6p87i.execute-api.us-east-1.amazonaws.com/dev/routes',
        { headers: { 'bikiapp-agent': app } },
      )
      .pipe(
        map(response => {
          return response.data;
        }),
        catchError(() => {
          return of([]);
        }),
      );
  }
}

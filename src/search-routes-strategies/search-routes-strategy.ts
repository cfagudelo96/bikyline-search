import { Observable } from 'rxjs';

import { Route } from '../shared/route';

export interface SearchRoutesStrategy {
  getRoutes(): Observable<Route[]>;
}

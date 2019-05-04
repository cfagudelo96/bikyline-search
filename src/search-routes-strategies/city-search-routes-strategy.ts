import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Route } from '../shared/route';
import { RoutesService } from '../routes-service';

import { SearchRoutesStrategy } from './search-routes-strategy';

export class CitySearchRoutesStrategy implements SearchRoutesStrategy {
  constructor(private routesService: RoutesService) {}

  getRoutes(): Observable<Route[]> {
    return this.routesService.getRoutes('city').pipe(
      switchMap((routes: Route[]) => {
        const processedRoutes: Route[] = routes;
        processedRoutes.sort((route1, route2) => {
          const seguridad1 = Route.getSpecificPropertyValue<number>(
            route1,
            'seguridad',
          );
          const seguridad2 = Route.getSpecificPropertyValue<number>(
            route2,
            'seguridad',
          );
          return seguridad2 - seguridad1;
        });
        return of(processedRoutes);
      }),
    );
  }
}

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Route } from '../shared/route';
import { RoutesService } from '../routes-service';

import { SearchRoutesStrategy } from './search-routes-strategy';

export class EnterpriseSearchRoutesStrategy implements SearchRoutesStrategy {
  constructor(private routesService: RoutesService) {}

  getRoutes(): Observable<Route[]> {
    return this.routesService.getRoutes('enterprise').pipe(
      switchMap((routes: Route[]) => {
        const processedRoutes: Route[] = routes;
        processedRoutes.sort((route1, route2) => {
          const estadoVia1 = Route.getSpecificPropertyValue<number>(
            route1,
            'estado_via',
          );
          const estadoVia2 = Route.getSpecificPropertyValue<number>(
            route2,
            'estado_via',
          );
          return estadoVia2 - estadoVia1;
        });
        return of(processedRoutes);
      }),
    );
  }
}

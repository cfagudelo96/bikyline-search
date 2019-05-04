import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Route } from '../shared/route';
import { RoutesService } from '../routes-service';

import { SearchRoutesStrategy } from './search-routes-strategy';

export class AdventureSearchRoutesStrategy implements SearchRoutesStrategy {
  constructor(private routesService: RoutesService) {}

  getRoutes(): Observable<Route[]> {
    return this.routesService.getRoutes('adventure').pipe(
      switchMap((routes: Route[]) => {
        const processedRoutes: Route[] = routes;
        processedRoutes.sort((route1, route2) => {
          const dificultad1 = Route.getSpecificPropertyValue<number>(route1, 'dificultad');
          const dificultad2 = Route.getSpecificPropertyValue<number>(route2, 'dificultad');
          return dificultad2 - dificultad1;
        });
        return of(processedRoutes);
      }),
    );
  }
}

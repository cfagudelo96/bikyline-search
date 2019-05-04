import { of } from 'rxjs';

import { Route } from '../shared/route';
import { RoutesService } from '../routes-service';
import { CitySearchRoutesStrategy } from './city-search-routes-strategy';

describe('CitySearchRoutesStrategy', () => {
  let routesService: RoutesService;
  let citySearchRoutesStrategy: CitySearchRoutesStrategy;

  const adventureRoute = {
    name: 'Ruta adventure',
    coordinates: [],
    properties: [{ name: 'dificultad', valor: 10 }, { name: 'seguridad', valor: 1 }, { name: 'estado_via', valor: 1 }],
  };

  const cityRoute = {
    name: 'Ruta city',
    coordinates: [],
    properties: [{ name: 'dificultad', valor: 1 }, { name: 'seguridad', valor: 10 }, { name: 'estado_via', valor: 5 }],
  };

  const enterpriseRoute = {
    name: 'Ruta enterprise',
    coordinates: [],
    properties: [{ name: 'dificultad', valor: 5 }, { name: 'seguridad', valor: 5 }, { name: 'estado_via', valor: 10 }],
  };

  const testRoutes: Route[] = [
    adventureRoute,
    cityRoute,
    enterpriseRoute,
  ];

  function mockRoutesService() {
    routesService = new RoutesService(null);
    jest.spyOn(routesService, 'getRoutes').mockImplementation((_: string) => {
      return of(testRoutes);
    });
  }

  beforeEach(() => {
    mockRoutesService();
    citySearchRoutesStrategy = new CitySearchRoutesStrategy(routesService);
  });

  describe('getRoutes', () => {
    it('returns the routes ordered by the state of the route', () => {
      let previousRoute = null;
      citySearchRoutesStrategy.getRoutes().subscribe(routes => {
        routes.forEach(route => {
          if (previousRoute) {
            const routeSecurity = Route.getSpecificPropertyValue<number>(route, 'seguridad');
            const previousRouteSecurity = Route.getSpecificPropertyValue<number>(previousRoute, 'seguridad');
            expect(routeSecurity).toBeLessThanOrEqual(previousRouteSecurity);
          }
          previousRoute = route;
        });
      });
    });
  });
});

import { of } from 'rxjs';

import { Route } from '../shared/route';
import { RoutesService } from '../routes-service';
import { EnterpriseSearchRoutesStrategy } from './enterprise-search-routes-strategy';

describe('EnterpriseSearchRoutesStrategy', () => {
  let routesService: RoutesService;
  let enterpriseSearchRoutesStrategy: EnterpriseSearchRoutesStrategy;

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
    enterpriseSearchRoutesStrategy = new EnterpriseSearchRoutesStrategy(routesService);
  });

  describe('getRoutes', () => {
    it('returns the routes ordered by the state of the route', () => {
      let previousRoute = null;
      enterpriseSearchRoutesStrategy.getRoutes().subscribe(routes => {
        routes.forEach(route => {
          if (previousRoute) {
            const routeState = Route.getSpecificPropertyValue<number>(route, 'estado_via');
            const previousRouteState = Route.getSpecificPropertyValue<number>(previousRoute, 'estado_via');
            expect(routeState).toBeLessThanOrEqual(previousRouteState);
          }
          previousRoute = route;
        });
      });
    });
  });
});

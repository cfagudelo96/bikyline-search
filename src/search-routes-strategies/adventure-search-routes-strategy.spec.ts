import { of } from 'rxjs';

import { Route } from '../shared/route';
import { RoutesService } from '../routes-service';
import { AdventureSearchRoutesStrategy } from './adventure-search-routes-strategy';

describe('AdventureSearchRoutesStrategy', () => {
  let routesService: RoutesService;
  let adventureSearchRoutesStrategy: AdventureSearchRoutesStrategy;

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
    adventureSearchRoutesStrategy = new AdventureSearchRoutesStrategy(routesService);
  });

  describe('getRoutes', () => {
    it('returns the routes ordered by difficulty', () => {
      let previousRoute = null;
      adventureSearchRoutesStrategy.getRoutes().subscribe(routes => {
        routes.forEach(route => {
          if (previousRoute) {
            const routeDifficulty = Route.getSpecificPropertyValue<number>(route, 'dificultad');
            const previousRouteDifficulty = Route.getSpecificPropertyValue<number>(previousRoute, 'dificultad');
            expect(routeDifficulty).toBeLessThanOrEqual(previousRouteDifficulty);
          }
          previousRoute = route;
        });
      });
    });
  });
});

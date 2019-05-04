import { of } from 'rxjs';
import * as mocks from 'node-mocks-http';

import { AppController } from './app.controller';
import { ConcreteFactoryResolver } from './concrete-factory-resolver';
import { AdventureSearchFactory } from './concrete-factories/adventure-search-factory';
import { CitySearchFactory } from './concrete-factories/city-search-factory';
import { EnterpriseSearchFactory } from './concrete-factories/enterprise-search-factory';
import { RoutesService } from './routes-service';
import { Route } from './shared/route';

describe('AppController', () => {
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

  let appController: AppController;
  let concreteFactoryResolver: ConcreteFactoryResolver;
  let routesService: RoutesService;
  let adventureSearchFactory: AdventureSearchFactory;
  let citySearchFactory: CitySearchFactory;
  let enterpriseSearchFactory: EnterpriseSearchFactory;

  function mockRoutesService() {
    routesService = new RoutesService(null);
    jest.spyOn(routesService, 'getRoutes').mockImplementation((_: string) => {
      return of(testRoutes);
    });
  }

  function initializeConcreteSearchFactories() {
    mockRoutesService();
    adventureSearchFactory = new AdventureSearchFactory(routesService);
    citySearchFactory = new CitySearchFactory(routesService);
    enterpriseSearchFactory = new EnterpriseSearchFactory(routesService);
    concreteFactoryResolver = new ConcreteFactoryResolver(adventureSearchFactory, citySearchFactory, enterpriseSearchFactory);
  }

  beforeEach(() => {
    initializeConcreteSearchFactories();
    appController = new AppController(concreteFactoryResolver);
  });

  describe('getRoutes', () => {
    it('should get the routes ordered by difficulty if the app is adventure', () => {
      let executed = false;
      const request = mocks.createRequest({ headers: { 'bikiapp-agent': 'adventure' } });
      appController.getRoutes(request).subscribe(result => {
        executed = true;
        expect(result).toEqual([adventureRoute, enterpriseRoute, cityRoute]);
      });
      expect(executed).toBe(true);
    });

    it('should get the routes ordered by security if the app is city', () => {
      let executed = false;
      const request = mocks.createRequest({ headers: { 'bikiapp-agent': 'city' } });
      appController.getRoutes(request).subscribe(result => {
        executed = true;
        expect(result).toEqual([cityRoute, enterpriseRoute, adventureRoute]);
      });
      expect(executed).toBe(true);
    });

    it('should get the routes ordered by the state of the route if the app is enterprise', () => {
      let executed = false;
      const request = mocks.createRequest({ headers: { 'bikiapp-agent': 'enterprise' } });
      appController.getRoutes(request).subscribe(result => {
        executed = true;
        expect(result).toEqual([enterpriseRoute, cityRoute, adventureRoute]);
      });
      expect(executed).toBe(true);
    });

    it('should fail', () => {
      expect(true).toBe(false);
    });
  });
});

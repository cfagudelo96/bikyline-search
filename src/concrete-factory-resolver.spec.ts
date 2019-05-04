import { of } from 'rxjs';

import { AdventureSearchFactory } from './concrete-factories/adventure-search-factory';
import { CitySearchFactory } from './concrete-factories/city-search-factory';
import { EnterpriseSearchFactory } from './concrete-factories/enterprise-search-factory';
import { ConcreteFactoryResolver } from './concrete-factory-resolver';
import { RoutesService } from './routes-service';

describe('ConcreteFactoryResolver', () => {
  let concreteFactoryResolver: ConcreteFactoryResolver;
  let routesService: RoutesService;
  let adventureSearchFactory: AdventureSearchFactory;
  let citySearchFactory: CitySearchFactory;
  let enterpriseSearchFactory: EnterpriseSearchFactory;

  function mockRoutesService() {
    routesService = new RoutesService(null);
    jest.spyOn(routesService, 'getRoutes').mockImplementation((_: string) => {
      return of([]);
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
  });

  describe('getConcreteFactory', () => {
    it('returns correctly the adventure search factory', () => {
      const factory = concreteFactoryResolver.getConcreteFactory('adventure');
      expect(factory).toBe(adventureSearchFactory);
    });

    it('returns correctly the enterprise search factory', () => {
      const factory = concreteFactoryResolver.getConcreteFactory('enterprise');
      expect(factory).toBe(enterpriseSearchFactory);
    });

    it('returns correctly the city search factory', () => {
      const factory = concreteFactoryResolver.getConcreteFactory('city');
      expect(factory).toBe(citySearchFactory);
    });

    it('returns the adventure factory by default', () => {
      const factory = concreteFactoryResolver.getConcreteFactory('why u reading mah code?');
      expect(factory).toBe(adventureSearchFactory);
    });
  });
});

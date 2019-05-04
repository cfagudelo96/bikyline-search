import { Injectable } from '@nestjs/common';

import { SearchFactory } from './search-factory';
import { AdventureSearchFactory } from './concrete-factories/adventure-search-factory';
import { CitySearchFactory } from './concrete-factories/city-search-factory';
import { EnterpriseSearchFactory } from './concrete-factories/enterprise-search-factory';

@Injectable()
export class ConcreteFactoryResolver {
  constructor(
    private adventureFactory: AdventureSearchFactory,
    private cityFactory: CitySearchFactory,
    private enterpriseFactory: EnterpriseSearchFactory,
  ) { }

  getConcreteFactory(app: string): SearchFactory {
    switch (app) {
      case 'adventure': {
        return this.adventureFactory;
      }
      case 'city': {
        return this.cityFactory;
      }
      case 'enterprise': {
        return this.enterpriseFactory;
      }
      default: {
        return this.adventureFactory;
      }
    }
  }
}

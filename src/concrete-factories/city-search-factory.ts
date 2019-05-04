import { Injectable } from '@nestjs/common';

import { SearchFactory } from '../search-factory';
import { SearchRoutesStrategy } from '../search-routes-strategies/search-routes-strategy';
import { CitySearchRoutesStrategy } from '../search-routes-strategies/city-search-routes-strategy';
import { SearchServicesStrategy } from '../search-services-strategies/search-services-strategy';
import { CitySearchServicesStrategy } from '../search-services-strategies/city-search-services-strategy';
import { RoutesService } from '../routes-service';

@Injectable()
export class CitySearchFactory implements SearchFactory {
  constructor(private routesService: RoutesService) {}

  getSearchRoutesStrategy(): SearchRoutesStrategy {
    return new CitySearchRoutesStrategy(this.routesService);
  }

  getSearchServicesStrategy(): SearchServicesStrategy {
    return new CitySearchServicesStrategy();
  }
}

import { Injectable } from '@nestjs/common';

import { SearchFactory } from '../search-factory';
import { SearchRoutesStrategy } from '../search-routes-strategies/search-routes-strategy';
import { EnterpriseSearchRoutesStrategy } from '../search-routes-strategies/enterprise-search-routes-strategy';
import { RoutesService } from '../routes-service';

@Injectable()
export class EnterpriseSearchFactory implements SearchFactory {
  constructor(private routesService: RoutesService) {}

  getSearchRoutesStrategy(): SearchRoutesStrategy {
    return new EnterpriseSearchRoutesStrategy(this.routesService);
  }
}

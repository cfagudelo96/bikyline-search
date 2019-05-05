import { Injectable } from '@nestjs/common';

import { SearchFactory } from '../search-factory';
import { SearchRoutesStrategy } from '../search-routes-strategies/search-routes-strategy';
import { AdventureSearchRoutesStrategy } from '../search-routes-strategies/adventure-search-routes-strategy';
import { RoutesService } from '../routes-service';

@Injectable()
export class AdventureSearchFactory implements SearchFactory {
  constructor(private routesService: RoutesService) {}

  getSearchRoutesStrategy(): SearchRoutesStrategy {
    return new AdventureSearchRoutesStrategy(this.routesService);
  }
}

import { SearchRoutesStrategy } from './search-routes-strategies/search-routes-strategy';

export interface SearchFactory {
  getSearchRoutesStrategy(): SearchRoutesStrategy;
}

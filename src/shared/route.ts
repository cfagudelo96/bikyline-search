import { Property } from './property';
import { Coordinate } from './coordinate';

export class Route {
  id?: string;
  updatedAt?: Date;

  constructor(
    public name: string,
    public properties: Property[],
    public coordinates: Coordinate[],
  ) {}

  static getSpecificPropertyValue<T>(route: Route, propertyName: string): T {
    const property = route.properties.find(
      propertySearch => propertySearch.name === propertyName,
    );
    return property ? property.valor : 0;
  }
}

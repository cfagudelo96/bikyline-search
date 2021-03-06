import { Controller, Get, Req } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

import { ConcreteFactoryResolver } from './concrete-factory-resolver';
import { Route } from './shared/route';

@Controller()
export class AppController {
  constructor(private readonly concreteFactoryResolver: ConcreteFactoryResolver) { }

  @Get('routes')
  getRoutes(@Req() request: Request): Observable<Route[]> {
    const searchFactory = this.concreteFactoryResolver.getConcreteFactory(
      request.headers['bikiapp-agent'] as string,
    );
    return searchFactory.getSearchRoutesStrategy().getRoutes();
  }

  @Get()
  getHome(): string {
    return 'Aplicación funciona';
  }
}

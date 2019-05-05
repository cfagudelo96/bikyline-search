import { Module, HttpModule } from '@nestjs/common';

import { AppController } from './app.controller';
import { RoutesService } from './routes-service';
import { ConcreteFactoryResolver } from './concrete-factory-resolver';
import { AdventureSearchFactory } from './concrete-factories/adventure-search-factory';
import { CitySearchFactory } from './concrete-factories/city-search-factory';
import { EnterpriseSearchFactory } from './concrete-factories/enterprise-search-factory';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [
    ConcreteFactoryResolver,
    RoutesService,
    AdventureSearchFactory,
    CitySearchFactory,
    EnterpriseSearchFactory,
  ],
})
export class AppModule {}

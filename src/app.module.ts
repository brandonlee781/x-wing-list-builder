import { MiddlewaresConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { GraphQLFactory, GraphQLModule } from '@nestjs/graphql';
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express';

import { AppController } from './app.controller';
import { ListModule } from './modules/list/list.module';
import { SourceModule } from './modules/source/source.module';
import { UpgradeModule } from './modules/upgrade/upgrade.module';

@Module({
  // controllers: [AppController],
  imports: [
    GraphQLModule,
    ListModule,
    SourceModule,
    UpgradeModule,
  ],
})
export class ApplicationModule implements NestModule {
  constructor(private readonly graphQLFactory: GraphQLFactory) {}

  public configure(consumer: MiddlewaresConsumer) {
    const typeDefs = this.graphQLFactory.mergeTypesByPaths('./**/*.graphql');
    const schema = this.graphQLFactory.createSchema({ typeDefs });

    consumer
      .apply(graphiqlExpress({ endpointURL: '/graphql' }))
      .forRoutes({ path: '/graphiql', method: RequestMethod.GET })
      .apply(graphqlExpress(req => ({ schema, rootValue: req })))
      .forRoutes({ path: '/graphql', method: RequestMethod.ALL });
  }
}

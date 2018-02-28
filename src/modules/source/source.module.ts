import { Module } from '@nestjs/common';

import { DatabaseModule } from '../Database/database.module';
import { sourceProviders } from './source.providers';
import { SourceResolver } from './source.resolver';
import { SourceService } from './source.service';

@Module({
  components: [
    ...sourceProviders,
    SourceService,
    SourceResolver,
  ],
  exports: [SourceService],
  imports: [DatabaseModule],
})
export class SourceModule {}

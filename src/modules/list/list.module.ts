import { Module } from '@nestjs/common';
import { DatabaseModule } from '../Database/database.module';
import { SourceModule } from '../source/source.module';
import { ListResolver } from './list.resolver';
import { ListService } from './list.service';

@Module({
  components: [
    ListService,
    ListResolver,
  ],
  imports: [
    SourceModule,
  ],
})
export class ListModule {}

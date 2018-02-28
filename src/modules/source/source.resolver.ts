import { Query, Resolver } from '@nestjs/graphql';

import { Source } from './source.entity';
import { SourceService } from './source.service';

interface SourceArgs {
  wave: string;
}

@Resolver('Source')
export class SourceResolver {
  constructor(
    private readonly sourceService: SourceService,
  ) {}

  @Query('allSources')
  public async allSources(obj: any, args: SourceArgs, context: {}, info: any): Promise<Source[]> {
    return await this.sourceService.findAll(args);
  }
}

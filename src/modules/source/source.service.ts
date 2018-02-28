import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Source } from './source.entity';

@Component()
export class SourceService {
  constructor(
    @Inject('SourceRepositoryToken') private readonly sourceRepository: Repository<Source>,
  ) {}

  public async findAll({ wave }: any): Promise<Source[]> {
    const query = this.sourceRepository.createQueryBuilder('source');
    if (wave) {
      query.where('source.wave = :wave', {wave});
    }
    return await query.getMany();
  }

  public async findOne({xws}: any): Promise<Source> {
    const source: Source = await this.sourceRepository
      .findOne({ where: { xws } });
    return source[0];
  }
}

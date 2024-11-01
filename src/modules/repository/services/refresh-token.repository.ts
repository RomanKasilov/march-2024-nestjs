import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class RefreshTokenRepository extends Repository<RefreshTokenRepository> {
  constructor(private readonly dataSource: DataSource) {
    super(RefreshTokenRepository, dataSource.manager);
  }
}

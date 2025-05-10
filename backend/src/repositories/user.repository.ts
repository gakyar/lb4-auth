import {DefaultCrudRepository} from '@loopback/repository';

import {inject} from '@loopback/core';
import {User, UserWithRelations} from '../models/user.model';
import {DbDataSource} from '../datasources/db.datasource';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserWithRelations
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(User, dataSource);
  }
}


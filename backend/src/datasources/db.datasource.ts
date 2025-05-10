import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

@lifeCycleObserver('datasource')
export class DbDataSource extends juggler.DataSource implements LifeCycleObserver {
  static dataSourceName = 'db';
  static readonly defaultConfig = {
    name: 'db',
    connector: 'memory',
  };

  constructor(
    @inject('datasources.config.db', {optional: true})
    dsConfig: object = DbDataSource.defaultConfig,
  ) {
    super(dsConfig);
  }
}

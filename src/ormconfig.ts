import { DataSource, DataSourceOptions } from 'typeorm';

const dbConfig = { synchronize: false } as DataSourceOptions;

switch (process.env.NODE_ENV) {
  case 'dev':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    });
    break;
  case 'production':
    break;
  default:
    throw new Error('unknown env');
}

export const AppDataSource = new DataSource(dbConfig);
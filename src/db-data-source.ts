import { DataSource, DataSourceOptions } from 'typeorm';

const dbConfig = {
  synchronize: false,
  migrations: [__dirname + '/migrations/*.ts'],
  migrationsTableName: 'migrations',
} as DataSourceOptions;

switch (process.env.NODE_ENV) {
  case 'dev':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}']
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrationsRun: true
    });
    break;
  case 'production':
    Object.assign(dbConfig, {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      migrationsRun: true,
      entities: [__dirname + '/**/*.entity.js'],
      ssl: {
        rejectUnathorized: false
      }
    })
    break;
  default:
    throw new Error('unknown env');
}

export const AppDataSource = new DataSource(dbConfig);
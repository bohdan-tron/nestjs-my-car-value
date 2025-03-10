import { DataSource, DataSourceOptions } from 'typeorm';

const dbConfig = {
  synchronize: false,
  migrationsTableName: 'migrations',
} as DataSourceOptions;

switch (process.env.NODE_ENV) {
  case 'dev':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/*.ts'],
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/migrations/*.ts'],
      migrationsRun: true
    });
    break;
  case 'production':
    Object.assign(dbConfig, {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [__dirname + '/**/*.entity.js'],
      migrations: [__dirname + '/migrations/*.js'],
      migrationsRun: true,
      ssl: {
        rejectUnauthorized: false
      },
      logging: true,
      logger: 'advanced-console'
    })
    break;
  default:
    throw new Error('unknown env');
}

export const AppDataSource = new DataSource(dbConfig);
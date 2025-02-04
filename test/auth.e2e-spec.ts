import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('Authentication System (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('handles a signup request', () => {
    const email = 'test1@test.com';

    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: '123123123' })
      .expect(201)
      .then((res) => {
        const { id, email } = res.body;
        expect(id).toBeDefined();
        expect(email).toEqual(email);
      });
  });

  it('signup as a new user then get a currently logged in user', async () => {
    const email = 'test2@test.com';

    const res = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({ email, password: '123123123' })
      .expect(201);

    const cookie = res.get('Set-Cookie');
    expect(cookie).toBeDefined();

    const { body } = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie as string[])
      .expect(200);

    expect(body.email).toEqual(email);
  })
});

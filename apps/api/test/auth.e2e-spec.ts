import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { User } from './../src/users/entities/user.entity';
import { Role } from './../src/common/enums/role.enum';
import { DataSource } from 'typeorm';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    dataSource = app.get(DataSource);
  }, 60000);

  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });

  beforeEach(async () => {
    await dataSource.getRepository(User).createQueryBuilder().delete().from(User).execute();
  });

  const testUser = {
    email: 'test@example.com',
    password: 'password123',
    firstName: 'Test',
    lastName: 'User',
    phone: '1234567890',
    roles: [Role.TENANT],
  };

  it('/auth/signup (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send(testUser)
      .expect(201)
      .expect((res) => {
        expect(res.body).toHaveProperty('accessToken');
        expect(res.body).toHaveProperty('refreshToken');
        expect(res.body.user).toHaveProperty('email', testUser.email);
      });
  }, 30000);

  it('/auth/signin (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: testUser.email,
        password: testUser.password,
      })
      .expect(401); // User does not exist yet in this test case
  }, 30000);

  it('/auth/signin after signup (POST)', async () => {
    await request(app.getHttpServer())
      .post('/auth/signup')
      .send(testUser)
      .expect(201);

    return request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: testUser.email,
        password: testUser.password,
      })
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('accessToken');
        expect(res.body).toHaveProperty('refreshToken');
        expect(res.body.user).toHaveProperty('email', testUser.email);
      });
  }, 30000);

  it('/auth/refresh (POST)', async () => {
    await request(app.getHttpServer())
      .post('/auth/signup')
      .send(testUser)
      .expect(201);

    const loginRes = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    const refreshToken = loginRes.body.refreshToken;

    return request(app.getHttpServer())
      .post('/auth/refresh')
      .set('Authorization', `Bearer ${refreshToken}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('accessToken');
        expect(res.body).toHaveProperty('refreshToken');
      });
  }, 30000);

  it('/auth/logout (POST)', async () => {
    await request(app.getHttpServer())
      .post('/auth/signup')
      .send(testUser)
      .expect(201);

    const loginRes = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: testUser.email,
        password: testUser.password,
      });

    const accessToken = loginRes.body.accessToken;

    return request(app.getHttpServer())
      .post('/auth/logout')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  }, 30000);
});
import { loadFeature, defineFeature } from 'jest-cucumber';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';


const feature = loadFeature('src/test.feature');

// @ts-ignore
import { Repository } from 'typeorm';
// @ts-ignore
import { TodoModule } from './todo/todo.module';
// @ts-ignore
import { TodoEntity } from './todo/todo.entity/todo.entity';
// @ts-ignore
import { TodoController } from './todo/todo.controller';
// @ts-ignore
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';


defineFeature(feature, (test) => {
    let controller: TodoController;
    let app: INestApplication;
    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({ 
            imports: [TypeOrmModule.forRoot({
                type: 'better-sqlite3',
                database: ':memory:',
                dropSchema: true,
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
            }),TodoModule],   
        }).compile();
        controller = new TodoController(module.get<Repository<TodoEntity>>(getRepositoryToken(TodoEntity)));
        app = module.createNestApplication();
        await app.init();
    });

    test('Using todo API POST functionality', ({ given, then }) => {
        let testObj;
        let addData = {name: "test" , completed: false}
        given('I add a todo via API', () => {
            return request(app.getHttpServer())
            .post('/todo')
            .send(addData)
            .expect(function(res){testObj = res})
        });
        then(/^the status code must be (\d+)$/, (arg0) => {
            expect(testObj["statusCode"]).toBe(parseInt(arg0))
        });
        then('I should be received response of the data that I just added and ID of it', () => {
            expect(JSON.parse(testObj.text)).toEqual({id: 1, ...addData});
        });
    });
    test('Using todo API GET functionality', ({ given, then }) => {
        let testObj;
        given('I called GET todo API', () => {
            return request(app.getHttpServer())
            .get('/todo')
            .expect(function(res){testObj = res})
        });
        then(/^the status code must be (\d+)$/, (arg0) => {
            expect(testObj["statusCode"]).toBe(parseInt(arg0))
        });
        then('I should be received todos data via controller', async () => {
            expect(testObj.text).toBe(JSON.stringify(await controller.findAll()))
        });
    });

    test('Using todo API DELETE functionality', ({ given, then }) => {
        let testObj;
        given('I called DELETE todo with ID as the parameter', () => {
            return request(app.getHttpServer())
            .delete('/todo/1')
            .expect(function(res){testObj = res})
        });
        then(/^the status code must be (\d+)$/, (arg0) => {
            expect(testObj["statusCode"]).toBe(parseInt(arg0))
        });
        then('I should be received response as a array which had affected as 1 and raw as an empty array', () => {
            expect(testObj.text).toBe(JSON.stringify({
                "raw": [],
                "affected": 1
            }))
        });
    });
});
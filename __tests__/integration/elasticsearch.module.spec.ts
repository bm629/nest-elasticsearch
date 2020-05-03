import { Client as Client5 } from 'es5';
import { Client as Client6 } from 'es6';
import { Client as Client7 } from 'es7';
import { TestingModule, Test } from '@nestjs/testing';
import { ElasticsearchModuleOptions, ElasticsearchModule } from '../../src';
import {
  DefaultOptionsElasticsearchConnectionTest,
  CustomOptionsElasticsearchConnectionTest,
  CustomOptionsElasticsearchVersion5ConnectionTest,
  CustomOptionsElasticsearchVersion6ConnectionTest,
} from '../data';

jest.genMockFromModule('es5');
jest.mock('es5');

jest.genMockFromModule('es6');
jest.mock('es6');

jest.genMockFromModule('es7');
jest.mock('es7');

const MockClient5: jest.Mock<any> = Client5 as any;
const MockClient6: jest.Mock<any> = Client6 as any;
const MockClient7: jest.Mock<any> = Client7 as any;

describe('ElasticsearchModule', () => {
  afterAll(() => {
    jest.unmock('es5');
    jest.unmock('es6');
    jest.unmock('es7');
  });

  afterEach(async () => {
    MockClient5.mockClear();
    MockClient6.mockClear();
    MockClient7.mockClear();
  });

  test('Instantiate ElasticsearchModule without any options', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ElasticsearchModule.forRoot()],
      providers: [DefaultOptionsElasticsearchConnectionTest],
    }).compile();

    const testConnection: DefaultOptionsElasticsearchConnectionTest = module.get(
      DefaultOptionsElasticsearchConnectionTest,
    );
    expect(testConnection).toBeInstanceOf(DefaultOptionsElasticsearchConnectionTest);
    expect(testConnection.getElasticsearchClient()).toBeInstanceOf(MockClient7);

    const options: ElasticsearchModuleOptions = MockClient7.mock.calls[0][0];
    expect(options).toEqual({});
  });

  test('Instantiate ElasticsearchModule with options', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ElasticsearchModule.forRoot({ name: 'elasticsearchClient' })],
      providers: [CustomOptionsElasticsearchConnectionTest],
    }).compile();

    const testConnection: CustomOptionsElasticsearchConnectionTest = module.get(
      CustomOptionsElasticsearchConnectionTest,
    );
    expect(testConnection).toBeInstanceOf(CustomOptionsElasticsearchConnectionTest);
    expect(testConnection.getElasticsearchClient()).toBeInstanceOf(MockClient7);

    const options: ElasticsearchModuleOptions = MockClient7.mock.calls[0][0];
    expect(options).toEqual({ name: 'elasticsearchClient' });
  });

  test('Instantiate ElasticsearchModule with options for version v5', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ElasticsearchModule.forRoot({ version: 'v5', name: 'elasticsearchClientV5' })],
      providers: [CustomOptionsElasticsearchVersion5ConnectionTest],
    }).compile();

    const testConnection: CustomOptionsElasticsearchVersion5ConnectionTest = module.get(
      CustomOptionsElasticsearchVersion5ConnectionTest,
    );
    expect(testConnection).toBeInstanceOf(CustomOptionsElasticsearchVersion5ConnectionTest);
    expect(testConnection.getElasticsearchClient()).toBeInstanceOf(MockClient5);

    const options: ElasticsearchModuleOptions = MockClient5.mock.calls[0][0];
    expect(options).toEqual({ version: 'v5', name: 'elasticsearchClientV5' });
  });

  test('Instantiate ElasticsearchModule with options for version v6', async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ElasticsearchModule.forRoot({ version: 'v6', name: 'elasticsearchClientV6' })],
      providers: [CustomOptionsElasticsearchVersion6ConnectionTest],
    }).compile();

    const testConnection: CustomOptionsElasticsearchVersion6ConnectionTest = module.get(
      CustomOptionsElasticsearchVersion6ConnectionTest,
    );
    expect(testConnection).toBeInstanceOf(CustomOptionsElasticsearchVersion6ConnectionTest);
    expect(testConnection.getElasticsearchClient()).toBeInstanceOf(MockClient6);

    const options: ElasticsearchModuleOptions = MockClient6.mock.calls[0][0];
    expect(options).toEqual({ version: 'v6', name: 'elasticsearchClientV6' });
  });
});

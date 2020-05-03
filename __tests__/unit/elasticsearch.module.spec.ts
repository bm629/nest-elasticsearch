import { Client as Client5 } from 'es5';
import { Client as Client6 } from 'es6';
import { Client as Client7 } from 'es7';
import { TestingModule, Test } from '@nestjs/testing';
import { ElasticsearchModuleOptions, ElasticsearchModule } from '../../src';
import {
  DefaultAsyncOptionsProvider,
  CustomAsyncOptionsProvider,
  CustomVersion5AsyncOptionsProvider,
  CustomVersion6AsyncOptionsProvider,
  ElasticsearchDataModule,
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

  describe('#forRoot()', () => {
    afterEach(async () => {
      MockClient5.mockClear();
      MockClient6.mockClear();
      MockClient7.mockClear();
    });

    test('ElasticsearchModule Instance (without any parameters)', async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [ElasticsearchModule.forRoot()],
      }).compile();

      const elasticsearchModule = module.get(ElasticsearchModule);
      expect(elasticsearchModule).toBeInstanceOf(ElasticsearchModule);
    });

    test('ElasticsearchModule Instance (with parameters)', async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          ElasticsearchModule.forRoot({
            name: 'ModuleTest',
          }),
        ],
      }).compile();

      const elasticsearchModule = module.get(ElasticsearchModule);
      expect(elasticsearchModule).toBeInstanceOf(ElasticsearchModule);
    });

    test('Should have default providers if no parameters passed', async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [ElasticsearchModule.forRoot()],
      }).compile();

      const elasticsearchModuleConnectionProvderName = module.get('ElasticsearchConnectionName');
      expect(elasticsearchModuleConnectionProvderName).toEqual('ElasticsearchClientConnection');

      const elasticsearch = module.get(elasticsearchModuleConnectionProvderName);
      expect(elasticsearch).toBeInstanceOf(MockClient7);

      const options: ElasticsearchModuleOptions = MockClient7.mock.calls[0][0];
      expect(options).toEqual({});
    });

    test('Should have providers if custom connection name passed', async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          ElasticsearchModule.forRoot({
            name: 'ModuleClient',
          }),
        ],
      }).compile();

      const elasticsearchModuleConnectionProvderName = module.get('ElasticsearchConnectionName');
      expect(elasticsearchModuleConnectionProvderName).toEqual('ModuleClientConnection');

      const elasticsearch = module.get(elasticsearchModuleConnectionProvderName);
      expect(elasticsearch).toBeInstanceOf(MockClient7);

      const options: ElasticsearchModuleOptions = MockClient7.mock.calls[0][0];
      expect(options).toEqual({ name: 'ModuleClient' });
    });

    test('Should have providers for elasticsearch client 5 if version set to v5', async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          ElasticsearchModule.forRoot({
            version: 'v5',
          }),
        ],
      }).compile();

      const elasticsearchModuleConnectionProvderName = module.get('ElasticsearchConnectionName');
      expect(elasticsearchModuleConnectionProvderName).toEqual('ElasticsearchClientConnection');

      const elasticsearch = module.get(elasticsearchModuleConnectionProvderName);
      expect(elasticsearch).toBeInstanceOf(MockClient5);

      const options: ElasticsearchModuleOptions = MockClient5.mock.calls[0][0];
      expect(options).toEqual({ version: 'v5' });
    });

    test('Should have providers for elasticsearch client 6 if version set to v6', async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          ElasticsearchModule.forRoot({
            version: 'v6',
          }),
        ],
      }).compile();

      const elasticsearchModuleConnectionProvderName = module.get('ElasticsearchConnectionName');
      expect(elasticsearchModuleConnectionProvderName).toEqual('ElasticsearchClientConnection');

      const elasticsearch = module.get(elasticsearchModuleConnectionProvderName);
      expect(elasticsearch).toBeInstanceOf(MockClient6);

      const options: ElasticsearchModuleOptions = MockClient6.mock.calls[0][0];
      expect(options).toEqual({ version: 'v6' });
    });
  });

  describe('#forRootAsync()', () => {
    describe('useFactory method', () => {
      afterEach(async () => {
        MockClient5.mockClear();
        MockClient6.mockClear();
        MockClient7.mockClear();
      });

      test('ElasticsearchModule Instance', async () => {
        const module: TestingModule = await Test.createTestingModule({
          imports: [
            ElasticsearchModule.forRootAsync({
              useFactory: () => {
                return {};
              },
            }),
          ],
        }).compile();

        const elasticsearchModule = module.get(ElasticsearchModule);
        expect(elasticsearchModule).toBeInstanceOf(ElasticsearchModule);
      });

      test('Should have default providers if no connection name passed', async () => {
        const module: TestingModule = await Test.createTestingModule({
          imports: [
            ElasticsearchModule.forRootAsync({
              useFactory: () => {
                return {};
              },
            }),
          ],
        }).compile();

        const elasticsearchModuleConnectionProvderName = module.get('ElasticsearchConnectionName');
        expect(elasticsearchModuleConnectionProvderName).toEqual('ElasticsearchClientConnection');

        const elasticsearch = module.get(elasticsearchModuleConnectionProvderName);
        expect(elasticsearch).toBeInstanceOf(MockClient7);

        const options: ElasticsearchModuleOptions = MockClient7.mock.calls[0][0];
        expect(options).toEqual({});
      });

      test('Should have providers if custom connection name passed', async () => {
        const module: TestingModule = await Test.createTestingModule({
          imports: [
            ElasticsearchModule.forRootAsync({
              name: 'elasticsearchModuleTest1',
              useFactory: () => {
                return {
                  name: 'elasticsearchModuleTest2',
                };
              },
            }),
          ],
        }).compile();

        const elasticsearchConnectionProvderName = module.get('ElasticsearchConnectionName');
        expect(elasticsearchConnectionProvderName).toEqual('elasticsearchModuleTest1Connection');

        const elasticsearch = module.get(elasticsearchConnectionProvderName);
        expect(elasticsearch).toBeInstanceOf(MockClient7);

        const options: ElasticsearchModuleOptions = MockClient7.mock.calls[0][0];
        expect(options).toEqual({ name: 'elasticsearchModuleTest1' });
      });

      test('Should have providers for elasticsearch client 5 if version set to v5', async () => {
        const module: TestingModule = await Test.createTestingModule({
          imports: [
            ElasticsearchModule.forRootAsync({
              useFactory: () => ({
                version: 'v5',
              }),
            }),
          ],
        }).compile();

        const elasticsearchModuleConnectionProvderName = module.get('ElasticsearchConnectionName');
        expect(elasticsearchModuleConnectionProvderName).toEqual('ElasticsearchClientConnection');

        const elasticsearch = module.get(elasticsearchModuleConnectionProvderName);
        expect(elasticsearch).toBeInstanceOf(MockClient5);

        const options: ElasticsearchModuleOptions = MockClient5.mock.calls[0][0];
        expect(options).toEqual({ version: 'v5' });
      });

      test('Should have providers for elasticsearch client 6 if version set to v6', async () => {
        const module: TestingModule = await Test.createTestingModule({
          imports: [
            ElasticsearchModule.forRootAsync({
              useFactory: () => ({
                version: 'v6',
              }),
            }),
          ],
        }).compile();

        const elasticsearchModuleConnectionProvderName = module.get('ElasticsearchConnectionName');
        expect(elasticsearchModuleConnectionProvderName).toEqual('ElasticsearchClientConnection');

        const elasticsearch = module.get(elasticsearchModuleConnectionProvderName);
        expect(elasticsearch).toBeInstanceOf(MockClient6);

        const options: ElasticsearchModuleOptions = MockClient6.mock.calls[0][0];
        expect(options).toEqual({ version: 'v6' });
      });
    });

    describe('useClass method', () => {
      afterEach(async () => {
        MockClient5.mockClear();
        MockClient6.mockClear();
        MockClient7.mockClear();
      });

      test('ElasticsearchModule Instance', async () => {
        const module: TestingModule = await Test.createTestingModule({
          imports: [
            ElasticsearchModule.forRootAsync({
              useClass: DefaultAsyncOptionsProvider,
            }),
          ],
        }).compile();

        const elasticsearchModule = module.get(ElasticsearchModule);
        expect(elasticsearchModule).toBeInstanceOf(ElasticsearchModule);
      });

      test('Should have default providers if no connection name passed', async () => {
        const module: TestingModule = await Test.createTestingModule({
          imports: [
            ElasticsearchModule.forRootAsync({
              useClass: DefaultAsyncOptionsProvider,
            }),
          ],
        }).compile();

        const elasticsearchModuleConnectionProvderName = module.get('ElasticsearchConnectionName');
        expect(elasticsearchModuleConnectionProvderName).toEqual('ElasticsearchClientConnection');

        const elasticsearch = module.get(elasticsearchModuleConnectionProvderName);
        expect(elasticsearch).toBeInstanceOf(MockClient7);

        const options: ElasticsearchModuleOptions = MockClient7.mock.calls[0][0];
        expect(options).toEqual({});
      });

      test('Should have providers if custom connection name passed', async () => {
        const module: TestingModule = await Test.createTestingModule({
          imports: [
            ElasticsearchModule.forRootAsync({
              name: 'elasticsearchModuleTest1',
              useClass: CustomAsyncOptionsProvider,
            }),
          ],
        }).compile();

        const elasticsearchConnectionProvderName = module.get('ElasticsearchConnectionName');
        expect(elasticsearchConnectionProvderName).toEqual('elasticsearchModuleTest1Connection');

        const elasticsearch = module.get(elasticsearchConnectionProvderName);
        expect(elasticsearch).toBeInstanceOf(MockClient7);

        const options: ElasticsearchModuleOptions = MockClient7.mock.calls[0][0];
        expect(options).toEqual({ name: 'elasticsearchModuleTest1' });
      });

      test('Should have providers for elasticsearch client 5 if version set to v5', async () => {
        const module: TestingModule = await Test.createTestingModule({
          imports: [
            ElasticsearchModule.forRootAsync({
              useClass: CustomVersion5AsyncOptionsProvider,
            }),
          ],
        }).compile();

        const elasticsearchModuleConnectionProvderName = module.get('ElasticsearchConnectionName');
        expect(elasticsearchModuleConnectionProvderName).toEqual('ElasticsearchClientConnection');

        const elasticsearch = module.get(elasticsearchModuleConnectionProvderName);
        expect(elasticsearch).toBeInstanceOf(MockClient5);

        const options: ElasticsearchModuleOptions = MockClient5.mock.calls[0][0];
        expect(options).toEqual({ version: 'v5' });
      });

      test('Should have providers for elasticsearch client 6 if version set to v6', async () => {
        const module: TestingModule = await Test.createTestingModule({
          imports: [
            ElasticsearchModule.forRootAsync({
              useClass: CustomVersion6AsyncOptionsProvider,
            }),
          ],
        }).compile();

        const elasticsearchModuleConnectionProvderName = module.get('ElasticsearchConnectionName');
        expect(elasticsearchModuleConnectionProvderName).toEqual('ElasticsearchClientConnection');

        const elasticsearch = module.get(elasticsearchModuleConnectionProvderName);
        expect(elasticsearch).toBeInstanceOf(MockClient6);

        const options: ElasticsearchModuleOptions = MockClient6.mock.calls[0][0];
        expect(options).toEqual({ version: 'v6' });
      });
    });

    describe('useClass method', () => {
      afterEach(async () => {
        MockClient5.mockClear();
        MockClient6.mockClear();
        MockClient7.mockClear();
      });

      test('ElasticsearchModule Instance', async () => {
        const module: TestingModule = await Test.createTestingModule({
          imports: [
            ElasticsearchModule.forRootAsync({
              imports: [ElasticsearchDataModule],
              useExisting: DefaultAsyncOptionsProvider,
            }),
          ],
        }).compile();

        const elasticsearchModule = module.get(ElasticsearchModule);
        expect(elasticsearchModule).toBeInstanceOf(ElasticsearchModule);
      });

      test('Should have default providers if no connection name passed', async () => {
        const module: TestingModule = await Test.createTestingModule({
          imports: [
            ElasticsearchModule.forRootAsync({
              imports: [ElasticsearchDataModule],
              useExisting: DefaultAsyncOptionsProvider,
            }),
          ],
        }).compile();

        const elasticsearchModuleConnectionProvderName = module.get('ElasticsearchConnectionName');
        expect(elasticsearchModuleConnectionProvderName).toEqual('ElasticsearchClientConnection');

        const elasticsearch = module.get(elasticsearchModuleConnectionProvderName);
        expect(elasticsearch).toBeInstanceOf(MockClient7);

        const options: ElasticsearchModuleOptions = MockClient7.mock.calls[0][0];
        expect(options).toEqual({});
      });

      test('Should have providers if custom connection name passed', async () => {
        const module: TestingModule = await Test.createTestingModule({
          imports: [
            ElasticsearchModule.forRootAsync({
              name: 'elasticsearchModuleTest1',
              imports: [ElasticsearchDataModule],
              useExisting: CustomAsyncOptionsProvider,
            }),
          ],
        }).compile();

        const elasticsearchConnectionProvderName = module.get('ElasticsearchConnectionName');
        expect(elasticsearchConnectionProvderName).toEqual('elasticsearchModuleTest1Connection');

        const elasticsearch = module.get(elasticsearchConnectionProvderName);
        expect(elasticsearch).toBeInstanceOf(MockClient7);

        const options: ElasticsearchModuleOptions = MockClient7.mock.calls[0][0];
        expect(options).toEqual({ name: 'elasticsearchModuleTest1' });
      });

      test('Should have providers for elasticsearch client 5 if version set to v5', async () => {
        const module: TestingModule = await Test.createTestingModule({
          imports: [
            ElasticsearchModule.forRootAsync({
              imports: [ElasticsearchDataModule],
              useExisting: CustomVersion5AsyncOptionsProvider,
            }),
          ],
        }).compile();

        const elasticsearchModuleConnectionProvderName = module.get('ElasticsearchConnectionName');
        expect(elasticsearchModuleConnectionProvderName).toEqual('ElasticsearchClientConnection');

        const elasticsearch = module.get(elasticsearchModuleConnectionProvderName);
        expect(elasticsearch).toBeInstanceOf(MockClient5);

        const options: ElasticsearchModuleOptions = MockClient5.mock.calls[0][0];
        expect(options).toEqual({ version: 'v5' });
      });

      test('Should have providers for elasticsearch client 6 if version set to v6', async () => {
        const module: TestingModule = await Test.createTestingModule({
          imports: [
            ElasticsearchModule.forRootAsync({
              imports: [ElasticsearchDataModule],
              useExisting: CustomVersion6AsyncOptionsProvider,
            }),
          ],
        }).compile();

        const elasticsearchModuleConnectionProvderName = module.get('ElasticsearchConnectionName');
        expect(elasticsearchModuleConnectionProvderName).toEqual('ElasticsearchClientConnection');

        const elasticsearch = module.get(elasticsearchModuleConnectionProvderName);
        expect(elasticsearch).toBeInstanceOf(MockClient6);

        const options: ElasticsearchModuleOptions = MockClient6.mock.calls[0][0];
        expect(options).toEqual({ version: 'v6' });
      });
    });
  });
});

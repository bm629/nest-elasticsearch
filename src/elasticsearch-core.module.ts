/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
import { Client as Client5 } from 'es5';
import { Client as Client6 } from 'es6';
import { Client as Client7 } from 'es7';
import { defer } from 'rxjs';
import { DynamicModule, Module, Global, Inject, Provider, OnModuleDestroy, Type } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { ELASTICSEARCH_CONNECTION_NAME, ELASTICSEARCH_MODULE_OPTIONS } from './elasticsearch.constants';
import {
  ElasticsearchModuleOptions,
  ElasticsearchModuleAsyncOptions,
  ElasticsearchOptionsFactory,
  ElasticsearchConnection,
} from './elsticsearch.interfaces';
import { getElasticsearchConnectionToken } from './elasticsearch.util';

/**
 * common interface for defining elasticsearch clients for each version between 5.x.x and 7.x.x
 */
type ElasticsearchClient = Client5 | Client6 | Client7;

/**
 * This is internal module used by {@link ElasticsearchModule} which actually creates elasticsearch client
 * and handle its lifecysle events
 *
 * @export
 * @class ElasticsearchCoreModule
 * @implements {OnModuleDestroy}
 */
@Global()
@Module({})
export class ElasticsearchCoreModule implements OnModuleDestroy {
  /**
   * Creates an instance of ElasticsearchCoreModule.
   * @param {string} name - elasticsearch client connection name
   * @param {ModuleRef} moduleRef - reference to metadata for this module
   * @memberof ElasticsearchCoreModule
   */
  constructor(
    @Inject(ELASTICSEARCH_CONNECTION_NAME) private readonly name: string,
    private readonly moduleRef: ModuleRef,
  ) {}

  /**
   * Register elasticsearch client synchronously
   *
   * @static
   * @param {ElasticsearchModuleOptions} [options={}] - options to create elasticsearch client
   * @returns {DynamicModule} - module which can be provide elasticsearch client
   * @memberof ElasticsearchCoreModule
   */
  static forRoot(options: ElasticsearchModuleOptions = {}): DynamicModule {
    const {
      elasticsearchConnectionName,
      elasticsearchConnectionNameProvider,
    }: ElasticsearchConnection = ElasticsearchCoreModule.getElasticsearchConnectionNameAndNameProvider(options.name);

    const elasticsearchConnectionProvider: Provider = {
      provide: elasticsearchConnectionName,
      useFactory: async (): Promise<ElasticsearchClient> =>
        defer(async () => {
          if (options.version === 'v5') {
            return new Client5(options);
          }
          if (options.version === 'v6') {
            return new Client6(options);
          }
          return new Client7(options);
        }).toPromise(),
    };

    return {
      module: ElasticsearchCoreModule,
      providers: [elasticsearchConnectionNameProvider, elasticsearchConnectionProvider],
      exports: [elasticsearchConnectionProvider],
    };
  }

  /**
   * Register elasticsearch client asynchronously
   *
   * @static
   * @param {ElasticsearchModuleAsyncOptions} asyncOptions - options to create elasticsearch client asynchronously
   * @returns {DynamicModule} - module which can be provide elasticsearch client
   * @memberof ElasticsearchCoreModule
   */
  static forRootAsync(asyncOptions: ElasticsearchModuleAsyncOptions): DynamicModule {
    const {
      elasticsearchConnectionName,
      elasticsearchConnectionNameProvider,
    }: ElasticsearchConnection = ElasticsearchCoreModule.getElasticsearchConnectionNameAndNameProvider(
      asyncOptions.name,
    );

    const elasticsearchConnectionProvider: Provider = {
      provide: elasticsearchConnectionName,
      useFactory: async (options: ElasticsearchModuleOptions): Promise<ElasticsearchClient> => {
        // eslint-disable-next-line no-param-reassign
        options.name = asyncOptions.name;
        return defer(async () => {
          if (options.version === 'v5') {
            return new Client5(options);
          }
          if (options.version === 'v6') {
            return new Client6(options);
          }
          return new Client7(options);
        }).toPromise();
      },
      inject: [ELASTICSEARCH_MODULE_OPTIONS],
    };

    const asyncProviders: Provider[] = this.createAsyncProviders(asyncOptions);

    return {
      module: ElasticsearchCoreModule,
      imports: asyncOptions.imports,
      providers: [...asyncProviders, elasticsearchConnectionNameProvider, elasticsearchConnectionProvider],
      exports: [elasticsearchConnectionProvider],
    };
  }

  /**
   * This is lifecysle method called by nest framework on module destroy.
   * we close elasticsearch client connection here and free all resources
   *
   * @returns {Promise<void>}
   * @memberof ElasticsearchCoreModule
   */
  async onModuleDestroy(): Promise<void> {
    const client: ElasticsearchClient = this.moduleRef.get<ElasticsearchClient>(this.name);
    client.close();
  }

  /**
   * provide details os actual connection name for elasticsearch client
   * along with provider which stores the value of this connection name
   *
   * @private
   * @static
   * @param {string} [name] - connection name pass by user
   * @returns {ElasticsearchConnection} - details of actual connection name and provider
   * @memberof ElasticsearchCoreModule
   */
  private static getElasticsearchConnectionNameAndNameProvider(name?: string): ElasticsearchConnection {
    const elasticsearchConnectionName = getElasticsearchConnectionToken(name);
    const elasticsearchConnectionNameProvider: Provider<string> = {
      provide: ELASTICSEARCH_CONNECTION_NAME,
      useValue: elasticsearchConnectionName,
    };
    return { elasticsearchConnectionName, elasticsearchConnectionNameProvider };
  }

  /**
   * This function is used to create async providers
   * which internally helps to get {@link ElasticsearchModuleOptions} asynchronously
   *
   * @private
   * @static
   * @param {ElasticsearchModuleAsyncOptions} asyncOptions - async options provided by user
   * @returns {Provider[]} - list of providers which provide {@link ElasticsearchModuleOptions} asynchronously
   * @memberof ElasticsearchCoreModule
   */
  private static createAsyncProviders(asyncOptions: ElasticsearchModuleAsyncOptions): Provider[] {
    const providers: Provider[] = [this.createElasticsearchModuleOptionsProvider(asyncOptions)];

    if (asyncOptions.useClass) {
      const useClass = asyncOptions.useClass as Type<ElasticsearchOptionsFactory>;
      providers.push({ provide: useClass, useClass });
    }
    return providers;
  }

  /**
   * This function is used to create actual option provider
   * which will be injected in creating elasticsearch client asynchronously
   *
   * @private
   * @static
   * @param {ElasticsearchModuleAsyncOptions} asyncOptions - async options provided by user
   * @returns {Provider} - provider for {@link ElasticsearchModuleOptions}
   * @memberof ElasticsearchCoreModule
   */
  private static createElasticsearchModuleOptionsProvider(asyncOptions: ElasticsearchModuleAsyncOptions): Provider {
    if (asyncOptions.useFactory) {
      return {
        provide: ELASTICSEARCH_MODULE_OPTIONS,
        useFactory: asyncOptions.useFactory,
        inject: asyncOptions.inject || [],
      };
    }

    const inject = [(asyncOptions.useClass || asyncOptions.useExisting) as Type<ElasticsearchOptionsFactory>];
    return {
      provide: ELASTICSEARCH_MODULE_OPTIONS,
      useFactory: async (optionFactory: ElasticsearchOptionsFactory) => optionFactory.createElasticsearchOptions(),
      inject,
    };
  }
}

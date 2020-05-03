import { DynamicModule, Type, Provider } from '@nestjs/common';
import { ClientOptions as ClientOptions5 } from 'es5';
import { ClientOptions as ClientOptions6 } from 'es6';
import { ClientOptions as ClientOptions7 } from 'es7';

/**
 * intrface defining properties are used to create elasticsearch verion 5.x.x client synchronously
 *
 * Checkout elasticsearch
 * [API Documentation]{@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/introduction.html}
 * for more details
 * @export
 * @interface ElasticsearchVersion5ModuleOptions
 * @extends {ClientOptions5}
 */
export interface ElasticsearchVersion5ModuleOptions extends ClientOptions5 {
  readonly version: 'v5';
}

/**
 * intrface defining properties are used to create elasticsearch verion 6.x.x client synchronously
 *
 * Checkout elasticsearch
 * [API Documentation]{@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/introduction.html}
 * for more details
 * @export
 * @interface ElasticsearchVersion6ModuleOptions
 * @extends {ClientOptions6}
 */
export interface ElasticsearchVersion6ModuleOptions extends ClientOptions6 {
  readonly version: 'v6';
}

/**
 * intrface defining properties are used to create elasticsearch verion 7.x.x client synchronously
 *
 * Checkout elasticsearch
 * [API Documentation]{@link https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/introduction.html}
 * for more details
 * @export
 * @interface ElasticsearchVersion7ModuleOptions
 * @extends {ClientOptions7}
 */
export interface ElasticsearchVersion7ModuleOptions extends ClientOptions7 {
  readonly version?: 'v7';
}

/**
 * common interface for defining elasticsearch module options for each version between 5.x.x and 7.x.x
 */
export type ElasticsearchModuleOptions =
  | ElasticsearchVersion5ModuleOptions
  | ElasticsearchVersion6ModuleOptions
  | ElasticsearchVersion7ModuleOptions;

/**
 * interface use to create factory which provides {@link ElasticsearchModuleOptions} asynchronously
 *
 * @export
 * @interface ElasticsearchOptionsFactory
 */
export interface ElasticsearchOptionsFactory {
  /**
   * this method must be overirded by factory call which provide {@link ElasticsearchModuleOptions}
   * synchronously/asynchronously
   *
   * @returns {(Promise<ElasticsearchModuleOptions> | ElasticsearchModuleOptions)} - elasticsearch connection options
   * @memberof ElasticsearchOptionsFactory
   */
  createElasticsearchOptions(): Promise<ElasticsearchModuleOptions> | ElasticsearchModuleOptions;
}

/**
 *
 * intrface defining properties are used to create elasticsearch client asynchronously
 * @export
 * @interface ElasticsearchModuleAsyncOptions
 * @extends {Pick<DynamicModule, 'imports'>}
 */
export interface ElasticsearchModuleAsyncOptions extends Pick<DynamicModule, 'imports'> {
  /**
   * Elasticsearch connection name
   *
   * @type {string}
   * @memberof ElasticsearchModuleAsyncOptions
   */
  name?: string;

  /**
   * Provider to be aliased by the Injection token.
   *
   * @type {Type<ElasticsearchOptionsFactory>}
   * @memberof ElasticsearchModuleAsyncOptions
   */
  useExisting?: Type<ElasticsearchOptionsFactory>;

  /**
   * Type of {@link ElasticsearchOptionsFactory} provider (instance to be injected).
   *
   * @type {Type<ElasticsearchOptionsFactory>}
   * @memberof ElasticsearchModuleAsyncOptions
   */
  useClass?: Type<ElasticsearchOptionsFactory>;

  /**
   * Factory function that returns an instance of {@link ElasticsearchModuleOptions} that to be injected.
   *
   * @memberof ElasticsearchModuleAsyncOptions
   */
  useFactory?: (...args: any[]) => Promise<ElasticsearchModuleOptions> | ElasticsearchModuleOptions;

  /**
   * Optional list of providers to be injected into the context of the Factory function.
   *
   * @type {any[]}
   * @memberof ElasticsearchModuleAsyncOptions
   */
  inject?: any[];
}

/**
 * private interface used by {@link ElasticsearchCoreModule} to store both elasticsearch client name
 * and prover which will provide this connection name
 *
 * @export
 * @interface ElasticsearchConnection
 */
export interface ElasticsearchConnection {
  /**
   * stores the actual name for elasticsearch client
   *
   * @type {string}
   * @memberof ElasticsearchConnection
   */
  elasticsearchConnectionName: string;

  /**
   * This is a provider which stores the value of elasticsearch client connection name
   *
   * @type {Provider<string>}
   * @memberof ElasticsearchConnection
   */
  elasticsearchConnectionNameProvider: Provider<string>;
}

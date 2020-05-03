import { DynamicModule, Module } from '@nestjs/common';
import { ElasticsearchModuleOptions, ElasticsearchModuleAsyncOptions } from './elsticsearch.interfaces';
import { ElasticsearchCoreModule } from './elasticsearch-core.module';

/**
 * This module is used to register elasticsearch client which can be injectable to repositories
 *
 * @export
 * @class ElasticsearchModule
 */
@Module({})
export class ElasticsearchModule {
  /**
   * Register elasticsearch client synchronously
   *
   * @static
   * @param {ElasticsearchModuleOptions} [options] - options to create elasticsearch client
   * @returns {DynamicModule} - module which can be provide elasticsearch client
   * @memberof ElasticsearchModule
   */
  static forRoot(options?: ElasticsearchModuleOptions): DynamicModule {
    return {
      module: ElasticsearchModule,
      imports: [ElasticsearchCoreModule.forRoot(options)],
    };
  }

  /**
   * Register elasticsearch client asynchronously
   *
   * @static
   * @param {ElasticsearchModuleAsyncOptions} options - options to create elasticsearch client asynchronously
   * @returns {DynamicModule} - module which can be provide elasticsearch client
   * @memberof ElasticsearchModule
   */
  static forRootAsync(options: ElasticsearchModuleAsyncOptions): DynamicModule {
    return {
      module: ElasticsearchModule,
      imports: [ElasticsearchCoreModule.forRootAsync(options)],
    };
  }
}

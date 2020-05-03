/* eslint-disable class-methods-use-this */
import { Injectable } from '@nestjs/common';
import { ElasticsearchOptionsFactory, ElasticsearchModuleOptions } from '../../src';

/**
 * @ignore
 */
@Injectable()
export class DefaultAsyncOptionsProvider implements ElasticsearchOptionsFactory {
  createElasticsearchOptions(): Promise<ElasticsearchModuleOptions> | ElasticsearchModuleOptions {
    return {};
  }
}

/* eslint-disable class-methods-use-this */
import { Injectable } from '@nestjs/common';
import { ElasticsearchOptionsFactory, ElasticsearchModuleOptions } from '../../src';

/**
 * @ignore
 */
@Injectable()
export class CustomAsyncOptionsProvider implements ElasticsearchOptionsFactory {
  createElasticsearchOptions(): Promise<ElasticsearchModuleOptions> | ElasticsearchModuleOptions {
    return {
      name: 'customClient',
    };
  }
}

/**
 * @ignore
 */
@Injectable()
export class CustomVersion5AsyncOptionsProvider implements ElasticsearchOptionsFactory {
  createElasticsearchOptions(): Promise<ElasticsearchModuleOptions> | ElasticsearchModuleOptions {
    return {
      name: 'customClient',
      version: 'v5',
    };
  }
}

/**
 * @ignore
 */
@Injectable()
export class CustomVersion6AsyncOptionsProvider implements ElasticsearchOptionsFactory {
  createElasticsearchOptions(): Promise<ElasticsearchModuleOptions> | ElasticsearchModuleOptions {
    return {
      name: 'customClient',
      version: 'v6',
    };
  }
}

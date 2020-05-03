/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
import { Client as Client5 } from 'es5';
import { Client as Client6 } from 'es6';
import { Client as Client7 } from 'es7';
import { Injectable } from '@nestjs/common';
import { InjectElasticsearchClient } from '../../src';

/**
 * @class
 * @ignore
 */
@Injectable()
export class CustomOptionsElasticsearchConnectionTest {
  constructor(@InjectElasticsearchClient('elasticsearchClient') private readonly elasticsearchClient: Client7) {}

  getElasticsearchClient() {
    return this.elasticsearchClient;
  }
}

/**
 * @class
 * @ignore
 */
@Injectable()
export class CustomOptionsElasticsearchVersion5ConnectionTest {
  constructor(@InjectElasticsearchClient('elasticsearchClientV5') private readonly elasticsearchClient: Client5) {}

  getElasticsearchClient() {
    return this.elasticsearchClient;
  }
}

/**
 * @class
 * @ignore
 */
@Injectable()
export class CustomOptionsElasticsearchVersion6ConnectionTest {
  constructor(@InjectElasticsearchClient('elasticsearchClientV6') private readonly elasticsearchClient: Client6) {}

  getElasticsearchClient() {
    return this.elasticsearchClient;
  }
}

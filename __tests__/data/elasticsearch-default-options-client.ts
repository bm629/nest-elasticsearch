/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
import { Client } from 'es7';
import { Injectable } from '@nestjs/common';
import { InjectElasticsearchClient } from '../../src';

/**
 * @class
 * @ignore
 */
@Injectable()
export class DefaultOptionsElasticsearchConnectionTest {
  constructor(@InjectElasticsearchClient() private readonly elasticsearchClient: Client) {}

  getElasticsearchClient() {
    return this.elasticsearchClient;
  }
}

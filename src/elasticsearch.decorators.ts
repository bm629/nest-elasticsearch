import { Inject } from '@nestjs/common';

import { getElasticsearchConnectionToken } from './elasticsearch.util';

/**
 * This decorator is used to inject Elasticsearch client
 *
 * @param {string} [name] - name used while creating elasticsearch client
 */
export const InjectElasticsearchClient = (name?: string) => Inject(getElasticsearchConnectionToken(name));

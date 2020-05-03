import { DEFAULT_ELASTICSEARCH_CLIENT_CONNECTION } from './elasticsearch.constants';

/**
 * This function is used to create elasticsearch connection provider name
 * which will store the value of elasticsearch client
 *
 * @export
 * @param {string} [name] - name used to create elasticsearch client which user will pass through elasticsearch options
 * @returns
 */
export function getElasticsearchConnectionToken(name?: string) {
  return name && name !== DEFAULT_ELASTICSEARCH_CLIENT_CONNECTION
    ? `${name}Connection`
    : DEFAULT_ELASTICSEARCH_CLIENT_CONNECTION;
}

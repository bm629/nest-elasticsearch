import { getElasticsearchConnectionToken } from '../../src';
import { DEFAULT_ELASTICSEARCH_CLIENT_CONNECTION } from '../../src/elasticsearch.constants';

describe('#getElasticsearchConnectionToken(name?: string)', () => {
  test('should return default token if connection name is not provided', () => {
    expect(getElasticsearchConnectionToken()).toEqual(DEFAULT_ELASTICSEARCH_CLIENT_CONNECTION);
  });

  test('should return valid token name if connection name provided', () => {
    const inputConnectionName: string = 'userElasticsearch';
    const expectedOutput = `${inputConnectionName}Connection`;
    expect(getElasticsearchConnectionToken(inputConnectionName)).toEqual(expectedOutput);
  });
});

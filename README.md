[![npm version](https://badge.fury.io/js/%40bm629%2Fnest-elasticsearch.svg)](https://badge.fury.io/js/%40bm629%2Fnest-elasticsearch)
[![Coverage Status](https://coveralls.io/repos/github/bm629/nest-elasticsearch/badge.svg?branch=master)](https://coveralls.io/github/bm629/nest-elasticsearch?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/bm629/nest-elasticsearch.png?branch=master)](https://travis-ci.org/@bm629/nest-elasticsearch)

## Description

[Elasticsearch](https://github.com/elastic/elasticsearch) module for [Nest](https://github.com/nestjs/nest).
This module supports elasticsearch version 5.x to 7.x

## Installation

```bash
# For version 7.x
$ npm i --save @bm629/nest-elasticsearch es7@npm:@elastic/elasticsearch

# For version 6.x
$ npm i --save @bm629/nest-elasticsearch es6@npm:@elastic/elasticsearch@6

# For version 5.x
$ npm i --save @bm629/nest-elasticsearch es5@npm:@elastic/elasticsearch@5
```

## Usage

Import Elasticsearch Module

```typescript

// For elastic client version 7.x
@Module({
  imports: [ElasticsearchModule.forRoot({
    node: 'localhost:9200',
  })],
  providers: [...],
})
export class SearchModule {}

// OR

// For elastic client version 6.x
@Module({
  imports: [ElasticsearchModule.forRoot({
    node: 'localhost:9200',
    version: 'v6'
  })],
  providers: [...],
})
export class SearchModule {}


// OR


// For elastic client version 5.x
@Module({
  imports: [ElasticsearchModule.forRoot({
    node: 'localhost:9200',
    version: 'v5'
  })],
  providers: [...],
})
export class SearchModule {}

```

Import Database module in AppModule

```typescript
// app.module.ts

@Module({
  imports: [SearchModule],
  controllers: [CatsController],
  providers: [CatSevice],
})
export class AppModule {}
```

Inject Elasticsearch client

```typescript
// cat.service.ts

import { Client } from 'es7';

export class CatService {
  contructor(@InjectElasticsearchClient() private readonly elasticsearchClient: Client) {}
}
```

For more information, see test cases. You can find details in the [`__tests__/`](https://github.com/bm629/nest-elasticsearch/tree/master/__tests__) folder of this repository.

## Async Options

Quite often you might want to asynchronously pass your module options instead of passing them beforehand. In such case, use forRootAsync() method, that provides a couple of various ways to deal with async data.

**1. Use factory**

```typescript
ElasticsearchModule.forRootAsync({
  useFactory: () => ({
    node: 'localhost:9200',
  }),
});
```

Obviously, our factory behaves like every other one (might be `async` and is able to inject dependencies through `inject`).

```typescript
ElasticsearchModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    node: configService.getString('ELASTICSEARCH_NODE'),
  }),
  inject: [ConfigService],
}),
```

**2. Use class**

```typescript
ElasticsearchModule.forRootAsync({
  useClass: ElasticsearchConfigService,
});
```

Above construction will instantiate `ElasticsearchConfigService` inside `ElasticsearchModule` and will leverage it to create options object.

```typescript
class ElasticsearchConfigService implements ElasticsearchOptionsFactory {
  createElasticsearchOptions(): ElasticsearchModuleOptions {
    return {
      node: 'localhost:9200',
    };
  }
}
```

**3. Use existing**

```typescript
ElasticsearchModule.forRootAsync({
  imports: [ConfigModule],
  useExisting: ConfigService,
}),
```

It works the same as `useClass` with one critical difference - `ElasticsearchModule` will lookup imported modules to reuse already created `ConfigService`, instead of instantiating it on its own.

## License

[MIT licensed](LICENSE).

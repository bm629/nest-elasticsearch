import { Module } from '@nestjs/common';
import { DefaultAsyncOptionsProvider } from './elasticsearch-default-async-options.provider';
import {
  CustomAsyncOptionsProvider,
  CustomVersion5AsyncOptionsProvider,
  CustomVersion6AsyncOptionsProvider,
} from './elasticsearch-custom-async-options.provider';

/**
 * @class
 * @ignore
 */
@Module({
  providers: [
    DefaultAsyncOptionsProvider,
    CustomAsyncOptionsProvider,
    CustomVersion5AsyncOptionsProvider,
    CustomVersion6AsyncOptionsProvider,
  ],
  exports: [
    DefaultAsyncOptionsProvider,
    CustomAsyncOptionsProvider,
    CustomVersion5AsyncOptionsProvider,
    CustomVersion6AsyncOptionsProvider,
  ],
})
export class ElasticsearchDataModule {}

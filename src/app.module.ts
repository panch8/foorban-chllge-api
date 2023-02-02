import { Module } from '@nestjs/common';
import { InfoModule } from './info/info.module';
import { DataModule } from './info/data/data.module';

//implemented DataModule. custom new model for excercise form
@Module({
  imports: [InfoModule, DataModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { ApiEndpointsModule } from './modules/api_endpoints/api_endpoints.module';
import { TableContent } from './modules/table_content/table_content.entity';
import { Table } from './modules/table/table.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TableModule } from './modules/table/table.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableContentModule } from './modules/table_content/table_content.module';
import { ApiEndpoint } from './modules/api_endpoints/entities/api_endpoint.entity';

@Module({
  imports: [
    TableModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql_server',
      port: 3306,
      username: 'user',
      password: 'abc@123',
      database: 'xano_clone',
      synchronize: true,
      entities: [Table, TableContent, ApiEndpoint],
    }),
    TableContentModule,
    ApiEndpointsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

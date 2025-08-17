import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { appConfig, dbConfig } from './config';
import { DatabaseModule } from './modules';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
            load: [appConfig, dbConfig],
            envFilePath: ['.env'],
        }),
        JwtModule.register({}),
        DatabaseModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}

import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerModule } from '@nestjs/throttler';

import { appConfig, dbConfig } from './config';
import { DatabaseModule } from './modules';
import { ExpenseModule } from './modules/expense/expense.module';

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
        AutomapperModule.forRoot({
            strategyInitializer: classes(),
        }),
        ThrottlerModule.forRoot({
            throttlers: [{ ttl: 1000, limit: 5 }],
        }),
        ExpenseModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}

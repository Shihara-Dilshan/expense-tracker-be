import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ExpenseController } from './controller/expense.controller';
import { ExpenseEntity, ExpenseSchema } from './entity/expense.entity';
import { ExpenseRepository } from './repository/expense.repository';
import { ExpenseService } from './services/expense.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ExpenseEntity.name, schema: ExpenseSchema },
        ]),
    ],
    controllers: [ExpenseController],
    providers: [ExpenseService, ExpenseRepository],
})
export class ExpenseModule {}

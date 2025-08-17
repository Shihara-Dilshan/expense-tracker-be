import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ExpenseController } from './controller/expense.controller';
import { UserBudgetController } from './controller/user-budget.controller';
import { ExpenseEntity, ExpenseSchema } from './entity/expense.entity';
import { UserBudget, UserBudgetSchema } from './entity/user-budget.entity';
import { ExpenseService } from './services/expense.service';
import { UserBudgetService } from './services/user-budget.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ExpenseEntity.name, schema: ExpenseSchema },
            { name: UserBudget.name, schema: UserBudgetSchema },
        ]),
    ],
    controllers: [ExpenseController, UserBudgetController],
    providers: [ExpenseService, UserBudgetService],
})
export class ExpenseModule {}

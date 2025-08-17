import { Body, Controller, Get, Put } from '@nestjs/common';

import { UserBudget } from '../entity/user-budget.entity';
import { UserBudgetService } from '../services/user-budget.service';

const hardCodedUserId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';

@Controller('user-budget')
export class UserBudgetController {
    constructor(private readonly userBudgetService: UserBudgetService) {}

    @Put()
    async setBudget(
        @Body('monthlyBudget') monthlyBudget: number,
    ): Promise<UserBudget> {
        return this.userBudgetService.setMonthlyBudget(
            hardCodedUserId,
            monthlyBudget,
        );
    }

    @Get()
    async getBudget(): Promise<UserBudget> {
        return this.userBudgetService.getMonthlyBudget(hardCodedUserId);
    }
}

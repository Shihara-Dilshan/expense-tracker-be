import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserBudget } from '../entity/user-budget.entity';

@Injectable()
export class UserBudgetService {
    constructor(
        @InjectModel(UserBudget.name)
        private readonly userBudgetModel: Model<UserBudget>,
    ) {}

    async setMonthlyBudget(
        userId: string,
        monthlyBudget: number,
    ): Promise<UserBudget> {
        return this.userBudgetModel.findOneAndUpdate(
            { userId },
            { monthlyBudget },
            { upsert: true, new: true },
        );
    }

    async getMonthlyBudget(userId: string): Promise<UserBudget> {
        let budget = await this.userBudgetModel.findOne({ userId });
        if (!budget) {
            budget = new this.userBudgetModel({ userId, monthlyBudget: 10000 });
            await budget.save();
        }
        return budget;
    }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateExpenseDto, UpdateExpenseDto } from '../dtos/request';
import { ExpenseEntity } from '../entity/expense.entity';

@Injectable()
export class ExpenseService {
    constructor(
        @InjectModel(ExpenseEntity.name)
        private readonly expenseModel: Model<ExpenseEntity>,
    ) {}

    async createExpense(
        dto: CreateExpenseDto,
        userId: string,
    ): Promise<ExpenseEntity> {
        const created = new this.expenseModel({ ...dto, userId });
        return created.save();
    }

    async updateExpense(
        id: string,
        dto: UpdateExpenseDto,
        userId: string,
    ): Promise<ExpenseEntity | null> {
        return this.expenseModel.findOneAndUpdate({ _id: id, userId }, dto, {
            new: true,
        });
    }

    async deleteExpense(
        id: string,
        userId: string,
    ): Promise<{ deleted: boolean }> {
        const res = await this.expenseModel.deleteOne({ _id: id, userId });
        return { deleted: res.deletedCount === 1 };
    }

    async getExpense(
        id: string,
        userId: string,
    ): Promise<ExpenseEntity | null> {
        return this.expenseModel.findOne({ _id: id, userId });
    }

    async getExpenses(
        userId: string,
        filter: any = {},
    ): Promise<ExpenseEntity[]> {
        return this.expenseModel.find({ userId, ...filter }).sort({ date: -1 });
    }

    async getMonthlyStats(userId: string, month: number, year: number) {
        const start = new Date(year, month - 1, 1);
        const end = new Date(year, month, 0, 23, 59, 59, 999);
        const expenses = await this.expenseModel.find({
            userId,
            date: { $gte: start, $lte: end },
        });
        const total = expenses.reduce((sum, e) => sum + e.amount, 0);
        return { total, expenses };
    }
}

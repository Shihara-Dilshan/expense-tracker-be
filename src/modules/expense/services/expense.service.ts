import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IPaginatedQueryResults } from 'src/shared/interfaces/paginated-query-results.interface';

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
        filter: { page?: number; limit?: number; search?: string } = {},
    ): Promise<IPaginatedQueryResults<ExpenseEntity[]>> {
        const page = filter.page && filter.page > 0 ? filter.page : 1;
        const limit = filter.limit && filter.limit > 0 ? filter.limit : 10;
        const skip = (page - 1) * limit;
        const query: any = { userId };
        if (filter.search) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            query.$or = [
                {
                    description: {
                        $regex: String(filter.search),
                        $options: 'i',
                    },
                },
            ];
        }
        const [results, totalResults] = await Promise.all([
            this.expenseModel
                .find(query)
                .sort({ date: -1 })
                .skip(skip)
                .limit(limit),
            this.expenseModel.countDocuments(query),
        ]);
        const totalPages = Math.ceil(totalResults / limit);
        return {
            results,
            page,
            limit,
            totalPages,
            totalResults,
        };
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

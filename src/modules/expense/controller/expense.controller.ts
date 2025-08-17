import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UseInterceptors,
} from '@nestjs/common';
import { ResponseInterceptor } from 'src/shared/interceptors/response.interceptor';

import { CreateExpenseDto, UpdateExpenseDto } from '../dtos/request';
import { ExpenseEntity } from '../entity/expense.entity';
import { ExpenseService } from '../services/expense.service';

const hardCodedUserId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479'; // HARDOCODED USER ID since the token logic is not implemented due to time constraints

@Controller('expense')
@UseInterceptors(ResponseInterceptor)
export class ExpenseController {
    constructor(private readonly expenseService: ExpenseService) {}

    @Post()
    async create(@Body() dto: CreateExpenseDto): Promise<ExpenseEntity> {
        return this.expenseService.createExpense(dto, hardCodedUserId);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateExpenseDto,
    ): Promise<ExpenseEntity | null> {
        return this.expenseService.updateExpense(id, dto, hardCodedUserId);
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<{ deleted: boolean }> {
        return this.expenseService.deleteExpense(id, hardCodedUserId);
    }

    @Get(':id')
    async get(@Param('id') id: string): Promise<ExpenseEntity | null> {
        return this.expenseService.getExpense(id, hardCodedUserId);
    }

    @Get()
    async list(@Query() query): Promise<ExpenseEntity[]> {
        return this.expenseService.getExpenses(hardCodedUserId, query);
    }

    @Get('/stats/monthly')
    async monthlyStats(
        @Query('month') month: number,
        @Query('year') year: number,
    ) {
        return this.expenseService.getMonthlyStats(
            hardCodedUserId,
            month,
            year,
        );
    }
}

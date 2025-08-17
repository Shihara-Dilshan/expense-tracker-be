export class CreateExpenseDto {
    description: string;
    date: Date;
    type: string;
    amount: number;
}

export class UpdateExpenseDto {
    description?: string;
    date?: Date;
    type?: string;
    amount?: number;
}

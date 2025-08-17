export class ExpenseResponseDto {
    id: string;
    description: string;
    date: Date;
    type: string;
    amount: number;
    userId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ExpenseEntity extends Document {
    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    date: Date;

    @Prop({ required: true })
    type: string;

    @Prop({ required: true })
    amount: number;

    @Prop({ required: true })
    userId: string;
}

export const ExpenseSchema = SchemaFactory.createForClass(ExpenseEntity);

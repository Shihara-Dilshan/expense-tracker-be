import { Test, TestingModule } from '@nestjs/testing';

import { UserBudgetService } from '../../services/user-budget.service';
import { UserBudgetController } from '../user-budget.controller';

const mockBudget: any = {
    _id: '1',
    userId: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    monthlyBudget: 15000,
};

describe('UserBudgetController', () => {
    let controller: UserBudgetController;
    let service: UserBudgetService;

    const mockService = {
        setMonthlyBudget: jest.fn().mockResolvedValue(mockBudget),
        getMonthlyBudget: jest.fn().mockResolvedValue(mockBudget),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserBudgetController],
            providers: [{ provide: UserBudgetService, useValue: mockService }],
        }).compile();

        controller = module.get<UserBudgetController>(UserBudgetController);
        service = module.get<UserBudgetService>(UserBudgetService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    it('should set monthly budget', async () => {
        expect(await controller.setBudget(15000)).toEqual(mockBudget);
        expect(service.setMonthlyBudget).toHaveBeenCalled();
    });

    it('should get monthly budget', async () => {
        expect(await controller.getBudget()).toEqual(mockBudget);
        expect(service.getMonthlyBudget).toHaveBeenCalled();
    });
});

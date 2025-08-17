import {
    Mapper,
    MappingProfile,
    createMap,
    forMember,
    ignore,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { CreateExpenseDto, UpdateExpenseDto } from '../dtos/request';
import { ExpenseResponseDto } from '../dtos/response';
import { ExpenseEntity } from '../entity/expense.entity';

@Injectable()
export class ExpenseProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    get profile(): MappingProfile {
        return mapper => {
            createMap(mapper, ExpenseEntity, ExpenseResponseDto);
            createMap(
                mapper,
                CreateExpenseDto,
                ExpenseEntity,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                forMember(dest => dest.id, ignore()),
            );
            createMap(mapper, ExpenseResponseDto, UpdateExpenseDto);
            createMap(mapper, UpdateExpenseDto, ExpenseEntity);
            createMap(mapper, ExpenseResponseDto, ExpenseEntity);
        };
    }
}

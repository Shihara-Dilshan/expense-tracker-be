/**
 * @fileOverview - uses to define independent custom configurations for DB
 * using nest namespaces
 */
import { registerAs } from '@nestjs/config';
import { CONFIG_NAMESPACES } from 'src/shared/constants';
import { IDBConfig } from 'src/shared/interfaces';
import { DBTypes } from 'src/shared/types';

export default registerAs(
    CONFIG_NAMESPACES.DB,
    (): IDBConfig => ({
        type: process.env.DB_TYPE as Extract<DBTypes, 'mongodb'>,
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME,
    }),
);

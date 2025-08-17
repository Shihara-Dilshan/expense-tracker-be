/**
 * @fileOverview - uses DBConfig interface for type-checking when accessing application
 * related configuration schemas
 */
import { DBTypes } from '../types';

export interface IDBConfig {
    type: Extract<DBTypes, 'mongodb'>;
    host: string;
    port: number;
    user: string;
    password: string;
    name: string;
}

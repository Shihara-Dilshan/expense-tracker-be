/**
 * @fileOverview - uses to define independent custom configurations
 * using nest namespaces
 */
import { registerAs } from '@nestjs/config';
import { CONFIG_NAMESPACES } from 'src/shared/constants';
import { IAppConfig } from 'src/shared/interfaces';

export default registerAs(
    CONFIG_NAMESPACES.APP,
    (): IAppConfig => ({
        env: process.env.NODE_ENV,
        port: +process.env.PORT || 3000,
        host: process.env.HOST,
        domain: process.env.DOMAIN,
    }),
);

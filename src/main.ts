// import fastifyCsrf from '@fastify/csrf-protection';
// import helmet from '@fastify/helmet';
import { ValidationPipe, VersioningType } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
    FastifyAdapter,
    NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { HttpExceptionFilter, ThrottlerExceptionFilter } from './filters';

// import { CONFIG_NAMESPACES } from './shared/constants';
// import { IAppConfig } from './shared/interfaces';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter({ logger: false }),
    );

    // global filters
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalFilters(new ThrottlerExceptionFilter());

    // const { host } = app
    //     .get(ConfigService)
    //     .get<IAppConfig>(CONFIG_NAMESPACES.APP);

    // Uri versioning
    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: ['1'],
    });
    app.setGlobalPrefix('api');

    // CSRF protection

    // await app.register(fastifyCsrf as any);

    // apply global payload validation
    // NOTE:: migrate to Using APP_PIPE as a Provider if needed in future.
    app.useGlobalPipes(new ValidationPipe({ transform: true }));

    // Register helmet for security headers

    // await app.register(helmet as any, {
    //     contentSecurityPolicy: {
    //         directives: {
    //             defaultSrc: ["'self'"],
    //             styleSrc: ["'self'", "'unsafe-inline'"],
    //             imgSrc: ["'self'", 'data:', 'validator.swagger.io'],
    //             scriptSrc: ["'self'", "'unsafe-inline'"],
    //         },
    //     },
    // });

    // Configure Swagger documentation
    const config = new DocumentBuilder()
        .setTitle('expensetracker')
        .setDescription('expensetracker API Documentation description')
        .setVersion('1.0.0.0')
        .addTag('Web Application APIs')
        .setExternalDoc('Postman Collection', '/api/v1/doc-json')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/v1/doc', app, document, {
        swaggerOptions: {
            tagsSorter: 'alpha',
            operationsSorter: 'alpha',
        },
    });

    // TODO : this is a temporary configuration
    app.enableCors({
        credentials: true,
        origin: (origin, callback) => {
            const allowedPatterns = [
                /^http:\/\/localhost(:\d+)?$/,
                /^https:\/\/nextjs-boilerplate-chi-lime-38\.vercel\.app$/, // NOTE:: should not be hardcoded
            ];

            if (
                !origin ||
                allowedPatterns.some(pattern => pattern.test(origin))
            ) {
                callback(null, true);
            } else {
                console.warn(`Blocked by CORS: ${origin}`);
                callback(new Error('Not allowed by CORS'), false);
            }
        },
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    });

    // NOTE:: not a proper way to handle this, due to an issue with heroku
    await app.listen(process.env.PORT, process.env.HOST);
}

bootstrap();

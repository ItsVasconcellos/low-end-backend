import fp from 'fastify-plugin';
import envPlugin from '@fastify/env';
import { FastifyPluginAsync } from 'fastify';

const schema = {
    type: 'object',
    required: ['PORT', 'POSTGRES_URI'],
    properties: {
        PORT: {
            type: 'string',
            default: '3000'
        },
        POSTGRES_URI: {
            type: 'string'
        },
        NODE_ENV: {
            type: 'string',
            default: 'development'
        }
    }
};

const env: FastifyPluginAsync = fp(async (fastify) => {
    await fastify.register(envPlugin, {
        schema,
        dotenv: true
    });
});

export default env;

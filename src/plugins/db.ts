import fp from 'fastify-plugin';
import postgresPlugin from '@fastify/postgres';
import { FastifyPluginAsync } from 'fastify';

declare module 'fastify' {
    interface FastifyInstance {
        config: {
            POSTGRES_URI: string;
            [key: string]: any;
        };
    }
}

const postgres: FastifyPluginAsync = fp(async (fastify) => {
    await fastify.register(postgresPlugin, {
        connectionString: fastify.config.POSTGRES_URI
    });
});

export default postgres;

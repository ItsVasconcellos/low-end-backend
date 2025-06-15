import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

// our-first-route.js

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */
interface HelloWorldResponse {
    hello: string;
}

interface RoutesOptions {
    // Define plugin options here if needed
    [key: string]: unknown;
}

async function routes(fastify: FastifyInstance, options: RoutesOptions): Promise<void> {
    fastify.get('/', async (request: FastifyRequest, reply: FastifyReply): Promise<HelloWorldResponse> => {
        return { hello: 'Extrato' };
    });
}

//ESM
export default routes;

// CommonJs
module.exports = routes
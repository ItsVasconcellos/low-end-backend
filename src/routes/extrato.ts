import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { responseExtratoSchema, requestExtratoSchema } from '../interfaces/validators/extrato';
import { handleExtrato } from '../controllers/extrato';

async function routes(fastify: FastifyInstance): Promise<void> {
    fastify.get<{
        Params: number;
        Reply: ExtratoRequest;
    }>('/:id/extrato', {
        schema: {
            params: requestExtratoSchema,
            response: {
                200: responseExtratoSchema,
                404: {
                    description: 'Cliente não encontrado',
                    type: 'object',
                    properties: {
                        error: { type: 'string' },
                    },
                },
            },
        }
    }, async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: number };
        console.log(id)
        try {
            const result = await handleExtrato(fastify, id, reply)
            return reply.status(200).send(result);
        }
        catch (error) {
            console.error('Extrato error:', error);
            return reply.status(422).send({ error: 'Internal Server Error' });
        }
    }
    );
};

export default routes;


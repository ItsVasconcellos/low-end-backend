import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { transactionSchema, paramsSchema } from '../interfaces/validators/transacao';
async function routes(fastify: FastifyInstance): Promise<void> {
    fastify.post<{ Body: TransactionRequestBody }>('/:id/transacoes',
        {
            schema: {
                body: transactionSchema,
                params: paramsSchema,
            },
        },
        async (request, response): Promise<TransactionResponse> => {
            const { id } = request.params as { id: number };
            const { valor, tipo, descricao } = request.body;

            const client = await fastify.pg.connect();

            response.status(200);
            return { limite: 0, saldo: 0 };
        });
}

export default routes;

import { FastifyInstance } from 'fastify';
import { transactionSchema, paramsSchema } from '../interfaces/validators/transacao';
import { handleTransaction } from '../controllers/transacao';

async function routes(fastify: FastifyInstance): Promise<void> {
    // Attach handleTransaction to fastify instance if not already present
    fastify.post<{ Body: TransactionRequestBody }>('/:id/transacoes',
        {
            schema: {
                body: transactionSchema,
                params: paramsSchema,
            },
        },
        async (request, response): Promise<TransactionResponse> => {
            const { id } = request.params as { id: number };
            // Call handleTransaction and return its result
            const result = await handleTransaction(fastify, id, request.body);

            response.status(200);
            return result;
        });
}


export default routes;

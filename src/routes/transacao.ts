import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { transactionSchema, paramsSchema } from '../interfaces/validators/transacao';
import { handleTransaction } from '../controllers/transacao';

async function routes(fastify: FastifyInstance): Promise<void> {
    fastify.post<{
        Body: TransactionRequestBody;
        Params: { id: number };
        Reply: TransactionResponse
    }>('/:id/transacoes',
        {
            schema: {
                body: transactionSchema,
                params: paramsSchema,
            },
        },
        async (request: FastifyRequest<{ Body: TransactionRequestBody; Params: { id: number } }>, reply: FastifyReply) => {
            const { id } = request.params;
            try {
                const result = await handleTransaction(fastify, reply, id, request.body);
                return reply.status(200).send(result);
            } catch (error) {
                console.log('Transaction error:', error);
                return reply.status(422).send({ error: 'Unprocessable Entity' });
            }
        }
    );
}

export default routes;

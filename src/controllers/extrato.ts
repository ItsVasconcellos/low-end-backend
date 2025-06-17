import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { requestExtratoSchema } from '../interfaces/validators/extrato';

export async function handleExtrato(
    fastify: FastifyInstance,
    clientId: number,
    reply: FastifyReply
) {
    ;
    if (isNaN(clientId)) {
        reply.code(400).send({ error: 'ID inválido' });
        return;
    }

    const client = await fastify.pg.connect();
    try {
        const nowResult = await client.query('SELECT NOW() AS current_time');
        const currentTime = nowResult.rows[0].current_time;

        const userResult = await client.query(
            'SELECT saldo, limite FROM Client WHERE id = $1',
            [clientId]
        );

        if (userResult.rowCount === 0) {
            reply.code(404).send({ error: 'Cliente não encontrado' });
            return;
        }

        const { saldo, limite } = userResult.rows[0];

        const transacoesResult = await client.query(
            `SELECT valor, tipo, descricao, date AS realizada_em
       FROM Transaction
       WHERE clientId = $1
       ORDER BY date DESC
       LIMIT 10`,
            [clientId]
        );

        const ultimas_transacoes = transacoesResult.rows.map((tx: any) => ({
            valor: tx.valor,
            tipo: tx.tipo,
            descricao: tx.descricao,
            realizada_em: tx.realizada_em,
        }));

        reply.code(200).send({
            saldo: {
                total: saldo,
                data_extrato: currentTime,
                limite,
            },
            ultimas_transacoes,
        });
    } finally {
        client.release();
    }
}

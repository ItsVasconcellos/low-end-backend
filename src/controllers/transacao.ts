import { FastifyInstance, FastifyReply } from 'fastify';

// filepath: /home/fvasconcellos/dev/mod/mod10/personal/low-end-backend/src/controllers/transacao.ts

export async function handleTransaction(
    fastify: FastifyInstance,
    reply: FastifyReply,
    id: number,
    body: TransactionRequestBody
): Promise<TransactionResponse | void> {
    const { valor, tipo, descricao } = body;
    const client = await fastify.pg.connect();
    const row = await client.query(
        'SELECT now() as current_time',
        []
    );
    console.log('Current time:', row.rows[0].current_time);
    try {
        // Fetch current saldo and limite
        const { rows } = await client.query(
            'SELECT saldo, limite FROM Client WHERE id = $1',
            [id]
        );
        if (rows.length === 0) {
            reply.code(404).send({ error: 'Cliente não encontrado' });
            return;
        }
        let { saldo, limite } = rows[0];

        // Apply transaction logic
        if (tipo === 'c') {
            saldo += valor;
        } else if (tipo === 'd') {
            if (saldo - valor < -limite) {
                reply.code(422).send({ error: 'Saldo insuficiente' });
                return;
            }
            saldo -= valor;
        }

        // Update saldo in DB
        await client.query(
            'UPDATE Client SET saldo = $1 WHERE id = $2',
            [saldo, id]
        );

        // Insert transaction record (optional, if you have a table for it)
        await client.query(
            'INSERT INTO Transaction (clientId, valor, tipo, descricao, date) VALUES ($1, $2, $3, $4, NOW())',
            [id, valor, tipo, descricao]
        );

        return { limite, saldo };
    } finally {
        client.release();
    }
}
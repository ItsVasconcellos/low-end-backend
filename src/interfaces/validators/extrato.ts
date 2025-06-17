export const requestExtratoSchema = {
    type: 'object',
    required: ['id'],
    properties: {
        id: { type: 'integer', minimum: 1 },
    },
} as const;

export const responseExtratoSchema = {
    type: 'object',
    properties: {
        saldo: {
            type: 'object',
            properties: {
                total: { type: 'integer' },
                data_extrato: { type: 'string', format: 'date-time' },
                limite: { type: 'integer' },
            },
        },
        ultimas_transacoes: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    valor: { type: 'integer' },
                    tipo: { type: 'string', enum: ['c', 'd'] },
                    descricao: { type: 'string', minLength: 1, maxLength: 10 },
                    realizada_em: { type: 'string', format: 'date-time' },
                }
            }
        }
    }
} as const;
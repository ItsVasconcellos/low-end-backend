export const transactionSchema = {
    type: 'object',
    required: ['valor', 'tipo', 'descricao'],
    properties: {
        valor: {
            type: 'integer',  // inteiro
            minimum: 1        // positivo (>= 1)
        },
        tipo: {
            type: 'string',
            enum: ['c', 'd'], // somente 'c' ou 'd'
        },
        descricao: {
            type: 'string',
            minLength: 1,
            maxLength: 10,
        },
    },
} as const;

export const paramsSchema = {
    type: 'object',
    required: ['id'],
    properties: {
        id: { type: 'number' },
    },
} as const;
interface ExtratoRequest {
    id: number;
}

interface ExtratoResponse {
    saldo: {
        total: number;
        data_extrato: string;
        limite: number;
    },
    ultimas_transacoes: Array<{
        valor: number;
        tipo: 'c' | 'd';
        descricao: string;
        realizada_em: string;
    }>;
}
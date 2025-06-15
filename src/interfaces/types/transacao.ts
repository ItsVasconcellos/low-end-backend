interface TransactionRequestBody {
    valor: number;
    tipo: 'c' | 'd';
    descricao: string;
}

interface TransactionResponse {
    limite: number;
    saldo: number;
}
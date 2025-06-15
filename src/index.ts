import Fastify, { fastify } from 'fastify'

const app = Fastify({
    logger: true,
});

app.get('/', async function () {
    return { hello: 'world' };
});

app.register(import('./api/routes/extrato'), {
    prefix: '/extrato',
});
async function main() {
    await app.listen({
        port: 3000,
        host: "0.0.0.0",
    });
}

main();
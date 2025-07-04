import Fastify from 'fastify';
import env from './plugins/env';
import postgres from './plugins/db';
import { runMigrations } from './utils/migration'; // Exemplo de onde colocar
import transacaoRoutes from './routes/transacao';
import extratoRoutes from './routes/extrato'


const app = Fastify({
    logger: true
});


// Importando plugins
app.register(env);
app.register(postgres);
// Importando rotas
app.register(extratoRoutes, { prefix: '/clientes' });
app.register(transacaoRoutes, { prefix: '/clientes' });

app.get('/', async (request, reply) => {
    return { hello: 'Low End Backend' };
});

const start = async () => {
    try {
        await app.listen({
            port: Number(app.config?.PORT || process.env.PORT || 3000),
            host: '0.0.0.0'
        });
        await runMigrations(app);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();

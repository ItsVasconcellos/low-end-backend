import Fastify from 'fastify';
import env from './plugins/env';
import postgres from './plugins/db';
import { runMigrations } from './api/utils/migration'; // Exemplo de onde colocar


const app = Fastify({
    logger: true
});


app.register(env);
app.register(postgres);

app.get('/', async () => {
    const client = await app.pg.connect();
    const { rows } = await client.query('SELECT * FROM Client LIMIT 1');
    client.release();
    return { message: 'Hello World!', dbTime: rows[0] };
});

const start = async () => {
    try {
        await app.listen({
            port: 8080,
            host: '0.0.0.0'
        });
        await runMigrations(app);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

start();

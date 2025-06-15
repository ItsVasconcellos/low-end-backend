import fs from 'fs/promises';
import path from 'path';
import { FastifyInstance } from 'fastify';

export async function runMigrations(fastify: FastifyInstance) {
    const sqlPath = path.join(__dirname, '..', 'scripts', 'init.sql');
    const sql = await fs.readFile(sqlPath, 'utf-8');
    const client = await fastify.pg.connect();
    try {
        await client.query(sql);
        fastify.log.info('✅ Migrations applied successfully');
    } finally {
        client.release();
    }
}

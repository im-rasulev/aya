import { DataSource } from "typeorm";
import dotenv from 'dotenv';
import { UserSchema } from "../entities/User.js";
import { UserInteractionSchema } from "../entities/UserInteraction.js";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "aya",
    synchronize: false,
    logging: false,
    entities: [UserSchema, UserInteractionSchema],
    migrations: [__dirname + "/../migrations/*.js"],
    migrationsTableName: "migrations"
}); 
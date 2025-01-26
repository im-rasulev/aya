export class CreateUserInteractions1710000000000 {
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "user_interactions" (
                "id" SERIAL PRIMARY KEY,
                "user_id" INTEGER REFERENCES "users"("id") ON DELETE CASCADE,
                "interaction_type" VARCHAR(50) NOT NULL,
                "request" TEXT,
                "response" TEXT,
                "created_at" TIMESTAMP NOT NULL DEFAULT now()
            )
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "user_interactions"`);
    }
} 
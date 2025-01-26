export class CreateUsers1709999999999 {
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL PRIMARY KEY,
                "vk_id" BIGINT UNIQUE NOT NULL,
                "first_name" VARCHAR(255),
                "last_name" VARCHAR(255),
                "status" VARCHAR(50) DEFAULT 'active',
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now()
            )
        `);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "users"`);
    }
} 
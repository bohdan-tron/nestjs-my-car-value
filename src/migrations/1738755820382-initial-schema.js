export class InitialSchema1738755820382 {
    name = "InitialSchema1738755820382"

    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "user" (
                "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL, 
                "email" VARCHAR NOT NULL, 
                "password" VARCHAR NOT NULL, 
                "admin" BOOLEAN NOT NULL DEFAULT TRUE
            )
        `)

        await queryRunner.query(`
            CREATE TABLE "report" (
                "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL, 
                "approved" BOOLEAN NOT NULL DEFAULT FALSE, 
                "price" INTEGER NOT NULL, 
                "make" VARCHAR NOT NULL, 
                "model" VARCHAR NOT NULL, 
                "year" INTEGER NOT NULL, 
                "lng" DOUBLE PRECISION NOT NULL, 
                "lat" DOUBLE PRECISION NOT NULL, 
                "mileage" INTEGER NOT NULL, 
                "userId" INTEGER
            )
        `)

        await queryRunner.query(`
            CREATE TABLE "temporary_report" (
                "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL, 
                "approved" BOOLEAN NOT NULL DEFAULT FALSE, 
                "price" INTEGER NOT NULL, 
                "make" VARCHAR NOT NULL, 
                "model" VARCHAR NOT NULL, 
                "year" INTEGER NOT NULL, 
                "lng" DOUBLE PRECISION NOT NULL, 
                "lat" DOUBLE PRECISION NOT NULL, 
                "mileage" INTEGER NOT NULL, 
                "userId" INTEGER,
                CONSTRAINT "FK_e347c56b008c2057c9887e230aa" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `)

        await queryRunner.query(`
            INSERT INTO "temporary_report" ("id", "approved", "price", "make", "model", "year", "lng", "lat", "mileage", "userId")
            SELECT "id", "approved", "price", "make", "model", "year", "lng", "lat", "mileage", "userId" FROM "report"
        `)

        await queryRunner.query(`DROP TABLE "report"`)
        await queryRunner.query(`ALTER TABLE "temporary_report" RENAME TO "report"`)
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "report" RENAME TO "temporary_report"`)

        await queryRunner.query(`
            CREATE TABLE "report" (
                "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY NOT NULL, 
                "approved" BOOLEAN NOT NULL DEFAULT FALSE, 
                "price" INTEGER NOT NULL, 
                "make" VARCHAR NOT NULL, 
                "model" VARCHAR NOT NULL, 
                "year" INTEGER NOT NULL, 
                "lng" DOUBLE PRECISION NOT NULL, 
                "lat" DOUBLE PRECISION NOT NULL, 
                "mileage" INTEGER NOT NULL, 
                "userId" INTEGER
            )
        `)

        await queryRunner.query(`
            INSERT INTO "report" ("id", "approved", "price", "make", "model", "year", "lng", "lat", "mileage", "userId")
            SELECT "id", "approved", "price", "make", "model", "year", "lng", "lat", "mileage", "userId" FROM "temporary_report"
        `)

        await queryRunner.query(`DROP TABLE "temporary_report"`)
        await queryRunner.query(`DROP TABLE "user"`)
        await queryRunner.query(`DROP TABLE "report"`)
    }
}
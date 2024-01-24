/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "name";

-- CreateTable
CREATE TABLE "Profile" (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user" UUID NOT NULL,
    "name" VARCHAR(255),
    "avaratUrl" VARCHAR(255),
    "isDeleted" BOOLEAN DEFAULT false,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_user_key" ON "Profile"("user");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION;

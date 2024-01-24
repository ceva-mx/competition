-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateTable
CREATE TABLE "User" (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "email" VARCHAR(255) NOT NULL,
    "provider" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255),
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Admin" (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "user" UUID NOT NULL,
    "competition" UUID NOT NULL,
    "isDeleted" BOOLEAN DEFAULT false,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Competition" (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(255),
    "description" TEXT,
    "posterUrl" VARCHAR(255),
    "link" VARCHAR(255),
    "isPublished" BOOLEAN DEFAULT false,
    "isDeleted" BOOLEAN DEFAULT false,

    CONSTRAINT "Competition_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Group" (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "competition" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "isDeleted" BOOLEAN DEFAULT false,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Participant" (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "competition" UUID NOT NULL,
    "user" UUID NOT NULL,
    "timeset" UUID NOT NULL,
    "group" UUID NOT NULL,
    "isDeleted" BOOLEAN DEFAULT false,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Result" (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "participant" UUID NOT NULL,
    "route" UUID NOT NULL,
    "finish" SMALLINT DEFAULT 0,
    "attempts" SMALLINT DEFAULT 0,
    "isDeleted" BOOLEAN DEFAULT false,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Route" (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "competition" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "category" VARCHAR(255),
    "cost" SMALLINT,
    "isDeleted" BOOLEAN DEFAULT false,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Timeset" (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "competition" UUID NOT NULL,
    "startTime" TIMESTAMPTZ(6) NOT NULL,
    "duration" SMALLINT NOT NULL,
    "isDeleted" BOOLEAN DEFAULT false,

    CONSTRAINT "Timeset_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_competition_fkey" FOREIGN KEY ("competition") REFERENCES "Competition"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_competition_fkey" FOREIGN KEY ("competition") REFERENCES "Competition"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_competition_fkey" FOREIGN KEY ("competition") REFERENCES "Competition"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_group_fkey" FOREIGN KEY ("group") REFERENCES "Group"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_timeset_fkey" FOREIGN KEY ("timeset") REFERENCES "Timeset"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_user_fkey" FOREIGN KEY ("user") REFERENCES "User"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_participant_fkey" FOREIGN KEY ("participant") REFERENCES "Participant"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_route_fkey" FOREIGN KEY ("route") REFERENCES "Route"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_competition_fkey" FOREIGN KEY ("competition") REFERENCES "Competition"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Timeset" ADD CONSTRAINT "Timeset_competition_fkey" FOREIGN KEY ("competition") REFERENCES "Competition"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION;

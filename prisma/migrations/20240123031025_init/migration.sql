-- CreateTable
CREATE TABLE "admin" (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "userUuid" UUID NOT NULL,
    "competitionUuid" UUID NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "group" (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "competitionUuid" UUID NOT NULL,
    "name" VARCHAR(255),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "group_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "participant" (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "competitionUuid" UUID NOT NULL,
    "userUuid" UUID NOT NULL,
    "timesetUuid" UUID NOT NULL,
    "groupUuid" UUID NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "participant_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "profile" (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "userUuid" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "result" (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "participantUuid" UUID NOT NULL,
    "routeUuid" UUID NOT NULL,
    "finish" SMALLINT,
    "attempts" SMALLINT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "result_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "route" (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "competitionUuid" UUID NOT NULL,
    "name" VARCHAR(255),
    "category" VARCHAR(255),
    "cost" SMALLINT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "route_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "timeset" (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "competitionUuid" UUID NOT NULL,
    "startTime" TIMESTAMPTZ(6),
    "duration" SMALLINT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "timeset_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "user" (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "email" VARCHAR(255) NOT NULL,
    "provider" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "competition" (
    "uuid" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR(255),
    "description" TEXT,
    "posterUrl" VARCHAR(255),
    "link" VARCHAR(255),
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "competition_pkey" PRIMARY KEY ("uuid")
);

-- CreateIndex
CREATE UNIQUE INDEX "profile_userUuid_key" ON "profile"("userUuid");

-- AddForeignKey
ALTER TABLE "admin" ADD CONSTRAINT "admin_competitionUuid_fkey" FOREIGN KEY ("competitionUuid") REFERENCES "competition"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "admin" ADD CONSTRAINT "admin_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "group" ADD CONSTRAINT "group_competitionUuid_fkey" FOREIGN KEY ("competitionUuid") REFERENCES "competition"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "participant" ADD CONSTRAINT "participant_competitionUuid_fkey" FOREIGN KEY ("competitionUuid") REFERENCES "competition"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "participant" ADD CONSTRAINT "participant_groupUuid_fkey" FOREIGN KEY ("groupUuid") REFERENCES "group"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "participant" ADD CONSTRAINT "participant_timesetUuid_fkey" FOREIGN KEY ("timesetUuid") REFERENCES "timeset"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "participant" ADD CONSTRAINT "participant_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "profile" ADD CONSTRAINT "profile_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "result" ADD CONSTRAINT "result_participantUuid_fkey" FOREIGN KEY ("participantUuid") REFERENCES "participant"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "result" ADD CONSTRAINT "result_routeUuid_fkey" FOREIGN KEY ("routeUuid") REFERENCES "route"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "route" ADD CONSTRAINT "route_competitionUuid_fkey" FOREIGN KEY ("competitionUuid") REFERENCES "competition"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "timeset" ADD CONSTRAINT "timeset_competitionUuid_fkey" FOREIGN KEY ("competitionUuid") REFERENCES "competition"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION;

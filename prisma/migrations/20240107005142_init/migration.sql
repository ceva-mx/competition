-- CreateTable
CREATE TABLE "User" (
    "uuid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Participant" (
    "uuid" TEXT NOT NULL,
    "userUuid" TEXT,
    "competitionUuid" TEXT,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Admin" (
    "uuid" TEXT NOT NULL,
    "userUuid" TEXT,
    "competitionUuid" TEXT,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Competition" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "posterUrl" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "link" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Competition_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Route" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "competitionUuid" TEXT,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Result" (
    "uuid" TEXT NOT NULL,
    "finish" INTEGER NOT NULL,
    "attempts" INTEGER NOT NULL,
    "routeUuid" TEXT,
    "participantUuid" TEXT,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participant" ADD CONSTRAINT "Participant_competitionUuid_fkey" FOREIGN KEY ("competitionUuid") REFERENCES "Competition"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_competitionUuid_fkey" FOREIGN KEY ("competitionUuid") REFERENCES "Competition"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_competitionUuid_fkey" FOREIGN KEY ("competitionUuid") REFERENCES "Competition"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_routeUuid_fkey" FOREIGN KEY ("routeUuid") REFERENCES "Route"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_participantUuid_fkey" FOREIGN KEY ("participantUuid") REFERENCES "Participant"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

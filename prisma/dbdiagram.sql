CREATE TABLE "user" (
  "uuid" uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
  "email" varchar(255) NOT NULL,
  "provider" varchar(255) NOT NULL,
  "createdAt" timestamptz DEFAULT (now()),
  "isDeleted" boolean NOT NULL DEFAULT false
);

CREATE TABLE "profile" (
  "uuid" uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
  "userUuid" uuid UNIQUE NOT NULL,
  "name" varchar(255) NOT NULL,
  "isDeleted" boolean NOT NULL DEFAULT false
);

CREATE TABLE "competition" (
  "uuid" uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
  "name" varchar(255),
  "description" text,
  "posterUrl" varchar(255),
  "link" varchar(255),
  "isPublished" boolean NOT NULL DEFAULT false,
  "isDeleted" boolean NOT NULL DEFAULT false
);

CREATE TABLE "route" (
  "uuid" uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
  "competitionUuid" uuid NOT NULL,
  "name" varchar(255),
  "category" varchar(255),
  "cost" smallint,
  "isDeleted" boolean NOT NULL DEFAULT false
);

CREATE TABLE "result" (
  "uuid" uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
  "participantUuid" uuid NOT NULL,
  "routeUuid" uuid NOT NULL,
  "finish" smallint,
  "attempts" smallint,
  "isDeleted" boolean NOT NULL DEFAULT false
);

CREATE TABLE "admin" (
  "uuid" uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
  "userUuid" uuid NOT NULL,
  "competitionUuid" uuid NOT NULL,
  "isDeleted" boolean NOT NULL DEFAULT false
);

CREATE TABLE "participant" (
  "uuid" uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
  "competitionUuid" uuid NOT NULL,
  "userUuid" uuid NOT NULL,
  "timesetUuid" uuid NOT NULL,
  "groupUuid" uuid NOT NULL,
  "isDeleted" boolean NOT NULL DEFAULT false
);

CREATE TABLE "timeset" (
  "uuid" uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
  "competitionUuid" uuid NOT NULL,
  "startTime" timestamptz,
  "duration" smallint,
  "isDeleted" boolean NOT NULL DEFAULT false
);

CREATE TABLE "group" (
  "uuid" uuid PRIMARY KEY DEFAULT (uuid_generate_v4()),
  "competitionUuid" uuid NOT NULL,
  "name" varchar(255),
  "isDeleted" boolean NOT NULL DEFAULT false
);

ALTER TABLE "profile" ADD FOREIGN KEY ("userUuid") REFERENCES "user" ("uuid");

ALTER TABLE "route" ADD FOREIGN KEY ("competitionUuid") REFERENCES "competition" ("uuid");

ALTER TABLE "result" ADD FOREIGN KEY ("participantUuid") REFERENCES "participant" ("uuid");

ALTER TABLE "result" ADD FOREIGN KEY ("routeUuid") REFERENCES "route" ("uuid");

ALTER TABLE "admin" ADD FOREIGN KEY ("userUuid") REFERENCES "user" ("uuid");

ALTER TABLE "admin" ADD FOREIGN KEY ("competitionUuid") REFERENCES "competition" ("uuid");

ALTER TABLE "participant" ADD FOREIGN KEY ("competitionUuid") REFERENCES "competition" ("uuid");

ALTER TABLE "participant" ADD FOREIGN KEY ("userUuid") REFERENCES "user" ("uuid");

ALTER TABLE "participant" ADD FOREIGN KEY ("timesetUuid") REFERENCES "timeset" ("uuid");

ALTER TABLE "participant" ADD FOREIGN KEY ("groupUuid") REFERENCES "group" ("uuid");

ALTER TABLE "timeset" ADD FOREIGN KEY ("competitionUuid") REFERENCES "competition" ("uuid");

ALTER TABLE "group" ADD FOREIGN KEY ("competitionUuid") REFERENCES "competition" ("uuid");

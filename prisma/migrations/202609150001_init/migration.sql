CREATE TABLE "Package" (
 "id" TEXT NOT NULL PRIMARY KEY, "senderHash" TEXT NOT NULL,
 "to" TEXT NOT NULL, "from" TEXT NOT NULL, "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
 "items" TEXT NOT NULL, "template" TEXT, "status" TEXT NOT NULL DEFAULT 'draft',
 "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, "openedAt" DATETIME,
 "recipientReaction" TEXT, "recipientNote" TEXT, "reactionHash" TEXT
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "plan" TEXT NOT NULL DEFAULT 'free',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bio" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "style" TEXT NOT NULL DEFAULT 'neutro',
    "template" TEXT NOT NULL DEFAULT 'minimalista',
    "links" JSONB NOT NULL DEFAULT '[]',
    "publicUrl" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT false,
    "views" INTEGER NOT NULL DEFAULT 0,
    "avatar" TEXT,
    "theme" JSONB NOT NULL DEFAULT '{"primaryColor": "#3b82f6", "backgroundColor": "#ffffff", "textColor": "#1f2937"}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Bio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BioView" (
    "id" TEXT NOT NULL,
    "bioId" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "referrer" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BioView_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Bio_publicUrl_key" ON "Bio"("publicUrl");

-- AddForeignKey
ALTER TABLE "Bio" ADD CONSTRAINT "Bio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BioView" ADD CONSTRAINT "BioView_bioId_fkey" FOREIGN KEY ("bioId") REFERENCES "Bio"("id") ON DELETE CASCADE ON UPDATE CASCADE;

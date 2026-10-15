/*
  Warnings:

  - A unique constraint covering the columns `[email,eventoId]` on the table `Inscrito` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `evento` ALTER COLUMN `fecha` DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX `Inscrito_email_eventoId_key` ON `Inscrito`(`email`, `eventoId`);

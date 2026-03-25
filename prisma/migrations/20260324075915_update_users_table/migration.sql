/*
  Warnings:

  - You are about to drop the column `account` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `address2` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `avatarUrl` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `account`,
    DROP COLUMN `address2`,
    DROP COLUMN `avatarUrl`,
    ADD COLUMN `accountType` VARCHAR(255) NULL,
    ADD COLUMN `avatar` VARCHAR(255) NULL;

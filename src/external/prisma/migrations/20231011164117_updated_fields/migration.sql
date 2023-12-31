/*
  Warnings:

  - You are about to drop the column `createdAt` on the `room_users` table. All the data in the column will be lost.
  - You are about to drop the column `roomId` on the `room_users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `room_users` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `room_users` table. All the data in the column will be lost.
  - Added the required column `room_id` to the `room_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `room_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `room_users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "room_users" DROP CONSTRAINT "room_users_roomId_fkey";

-- DropForeignKey
ALTER TABLE "room_users" DROP CONSTRAINT "room_users_userId_fkey";

-- AlterTable
ALTER TABLE "room_users" DROP COLUMN "createdAt",
DROP COLUMN "roomId",
DROP COLUMN "updatedAt",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "room_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "room_users" ADD CONSTRAINT "room_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_users" ADD CONSTRAINT "room_users_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

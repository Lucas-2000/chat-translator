/*
  Warnings:

  - You are about to drop the column `room_id` on the `room_users` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `room_users` table. All the data in the column will be lost.
  - Added the required column `roomId` to the `room_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `room_users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "room_users" DROP CONSTRAINT "room_users_room_id_fkey";

-- DropForeignKey
ALTER TABLE "room_users" DROP CONSTRAINT "room_users_user_id_fkey";

-- AlterTable
ALTER TABLE "room_users" DROP COLUMN "room_id",
DROP COLUMN "user_id",
ADD COLUMN     "roomId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "room_users" ADD CONSTRAINT "room_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_users" ADD CONSTRAINT "room_users_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- DropForeignKey
ALTER TABLE "room_users" DROP CONSTRAINT "room_users_roomId_fkey";

-- DropForeignKey
ALTER TABLE "room_users" DROP CONSTRAINT "room_users_userId_fkey";

-- AddForeignKey
ALTER TABLE "room_users" ADD CONSTRAINT "room_users_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room_users" ADD CONSTRAINT "room_users_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

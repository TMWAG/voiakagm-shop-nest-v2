/*
  Warnings:

  - A unique constraint covering the columns `[vk_link]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[tg_link]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_vk_link_key" ON "users"("vk_link");

-- CreateIndex
CREATE UNIQUE INDEX "users_tg_link_key" ON "users"("tg_link");

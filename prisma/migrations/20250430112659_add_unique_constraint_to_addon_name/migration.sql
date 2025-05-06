/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `AddOn` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "AddOn_name_key" ON "AddOn"("name");

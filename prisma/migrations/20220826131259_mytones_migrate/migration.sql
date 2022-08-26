/*
  Warnings:

  - A unique constraint covering the columns `[file_path]` on the table `Song` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ISRC]` on the table `Song` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Song_file_path_key" ON "Song"("file_path");

-- CreateIndex
CREATE UNIQUE INDEX "Song_ISRC_key" ON "Song"("ISRC");

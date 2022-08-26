-- DropForeignKey
ALTER TABLE "Playlist" DROP CONSTRAINT "Playlist_user_id_fkey";

-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "plays" BIGINT NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "plays" BIGINT NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "plays" BIGINT NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Genre" (
    "id" "Genres" NOT NULL,
    "plays" BIGINT NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "Genre_id_key" ON "Genre"("id");

-- CreateIndex
CREATE INDEX "Genre_id_idx" ON "Genre"("id");

-- CreateIndex
CREATE INDEX "Album_id_idx" ON "Album"("id");

-- CreateIndex
CREATE INDEX "Album_name_idx" ON "Album"("name");

-- CreateIndex
CREATE INDEX "Artist_id_idx" ON "Artist"("id");

-- CreateIndex
CREATE INDEX "Artist_name_idx" ON "Artist"("name");

-- CreateIndex
CREATE INDEX "Favorites_id_idx" ON "Favorites"("id");

-- CreateIndex
CREATE INDEX "Favorites_user_id_idx" ON "Favorites"("user_id");

-- CreateIndex
CREATE INDEX "Playlist_id_idx" ON "Playlist"("id");

-- CreateIndex
CREATE INDEX "Song_id_idx" ON "Song"("id");

-- CreateIndex
CREATE INDEX "Song_song_name_idx" ON "Song"("song_name");

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

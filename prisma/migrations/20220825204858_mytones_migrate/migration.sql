/*
  Warnings:

  - You are about to drop the column `last_active` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('SONGS', 'ARTISTS', 'ALBUMS', 'DOWNLOADS');

-- CreateEnum
CREATE TYPE "Genres" AS ENUM ('POP', 'COUNTRY', 'ELECTRONIC', 'BLUES', 'ROCK', 'HIPHOP', 'JAZZ', 'METAL', 'INDIE', 'DANCE', 'SOUL', 'LATIN', 'KPOP', 'DUBSTEP', 'TECHNO', 'FOLK', 'INSTRUMENTAL', 'EMO', 'GOSPEL', 'HOUSE', 'RnB', 'PSYCHEDELIC', 'RAP', 'DISCO', 'PUNK', 'COVER', 'CLASSICAL');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "last_active",
ALTER COLUMN "updated_at" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Favorites" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" "Type" NOT NULL,
    "songs_id" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Favorites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Song" (
    "id" TEXT NOT NULL,
    "song_name" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "artist_id" TEXT NOT NULL,
    "album_id" TEXT,
    "copyright_info" TEXT,
    "ISRC" TEXT,
    "writers" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "engineers" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "producers" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "publisher" TEXT,
    "release_date" TIMESTAMP(3),
    "genres" "Genres"[] DEFAULT ARRAY[]::"Genres"[],
    "duration" TEXT NOT NULL,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Playlist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "songs_id" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Playlist_pkey" PRIMARY KEY ("id","user_id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "albums_id" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "songs_id" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Album" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "artist_id" TEXT NOT NULL,
    "release_date" TIMESTAMP(3) NOT NULL,
    "genres" "Genres"[] DEFAULT ARRAY[]::"Genres"[],
    "songs_id" TEXT[],

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Favorites_id_key" ON "Favorites"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Song_id_key" ON "Song"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Playlist_id_key" ON "Playlist"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Playlist_user_id_key" ON "Playlist"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Artist_id_key" ON "Artist"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Album_id_key" ON "Album"("id");

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

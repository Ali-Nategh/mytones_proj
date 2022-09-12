-- CreateEnum
CREATE TYPE "Role" AS ENUM ('BASIC', 'EDITOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "Action" AS ENUM ('LIKE', 'PLAY', 'SONGS', 'ARTISTS', 'ALBUMS', 'DOWNLOADS');

-- CreateEnum
CREATE TYPE "Groups" AS ENUM ('PLAYLIST', 'ALBUM');

-- CreateEnum
CREATE TYPE "Genres" AS ENUM ('POP', 'COUNTRY', 'ELECTRONIC', 'BLUES', 'ROCK', 'HIPHOP', 'JAZZ', 'METAL', 'INDIE', 'DANCE', 'SOUL', 'LATIN', 'KPOP', 'DUBSTEP', 'TECHNO', 'FOLK', 'INSTRUMENTAL', 'EMO', 'GOSPEL', 'HOUSE', 'RnB', 'PSYCHEDELIC', 'RAP', 'DISCO', 'PUNK', 'COVER', 'CLASSICAL');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "age" INTEGER,
    "role" "Role" NOT NULL DEFAULT 'BASIC',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Email" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Email_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Song" (
    "id" TEXT NOT NULL,
    "song_name" TEXT NOT NULL,
    "file_path" TEXT NOT NULL,
    "artist_id" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "album_id" TEXT,
    "publisher" TEXT,
    "ISRC" TEXT,
    "copyright_info" TEXT,
    "release_date" TEXT,
    "genres" "Genres"[] DEFAULT ARRAY[]::"Genres"[],
    "producers" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "writers" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "engineers" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Album" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "artist_id" TEXT NOT NULL,
    "release_date" TEXT NOT NULL,
    "feat_artists_id" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "genres" "Genres"[] DEFAULT ARRAY[]::"Genres"[],

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Playlist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Playlist_pkey" PRIMARY KEY ("id","user_id")
);

-- CreateTable
CREATE TABLE "Grouping" (
    "id" SERIAL NOT NULL,
    "group_type" "Groups" NOT NULL,
    "group_id" TEXT NOT NULL,
    "creator_id" TEXT NOT NULL,
    "song_id" TEXT NOT NULL,

    CONSTRAINT "Grouping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" "Genres" NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Actions" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "target_id" TEXT NOT NULL,
    "action_type" "Action" NOT NULL,

    CONSTRAINT "Actions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE INDEX "User_id_idx" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Email_id_key" ON "Email"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Email_user_id_key" ON "Email"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Email_email_key" ON "Email"("email");

-- CreateIndex
CREATE INDEX "Email_user_id_idx" ON "Email"("user_id");

-- CreateIndex
CREATE INDEX "Email_email_idx" ON "Email"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Song_id_key" ON "Song"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Song_file_path_key" ON "Song"("file_path");

-- CreateIndex
CREATE UNIQUE INDEX "Song_ISRC_key" ON "Song"("ISRC");

-- CreateIndex
CREATE INDEX "Song_id_idx" ON "Song"("id");

-- CreateIndex
CREATE INDEX "Song_song_name_idx" ON "Song"("song_name");

-- CreateIndex
CREATE UNIQUE INDEX "Artist_id_key" ON "Artist"("id");

-- CreateIndex
CREATE INDEX "Artist_id_idx" ON "Artist"("id");

-- CreateIndex
CREATE INDEX "Artist_name_idx" ON "Artist"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Album_id_key" ON "Album"("id");

-- CreateIndex
CREATE INDEX "Album_id_idx" ON "Album"("id");

-- CreateIndex
CREATE INDEX "Album_name_idx" ON "Album"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Playlist_id_key" ON "Playlist"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Playlist_user_id_key" ON "Playlist"("user_id");

-- CreateIndex
CREATE INDEX "Playlist_id_idx" ON "Playlist"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Grouping_id_key" ON "Grouping"("id");

-- CreateIndex
CREATE INDEX "Grouping_song_id_idx" ON "Grouping"("song_id");

-- CreateIndex
CREATE INDEX "Grouping_group_type_idx" ON "Grouping"("group_type");

-- CreateIndex
CREATE UNIQUE INDEX "Grouping_song_id_group_type_group_id_key" ON "Grouping"("song_id", "group_type", "group_id");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_id_key" ON "Genre"("id");

-- CreateIndex
CREATE INDEX "Genre_id_idx" ON "Genre"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Actions_id_key" ON "Actions"("id");

-- CreateIndex
CREATE INDEX "Actions_user_id_idx" ON "Actions"("user_id");

-- CreateIndex
CREATE INDEX "Actions_target_id_idx" ON "Actions"("target_id");

-- CreateIndex
CREATE UNIQUE INDEX "Actions_user_id_target_id_action_type_key" ON "Actions"("user_id", "target_id", "action_type");

-- AddForeignKey
ALTER TABLE "Playlist" ADD CONSTRAINT "Playlist_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

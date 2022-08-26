-- AlterTable
ALTER TABLE "Favorites" ADD COLUMN     "albums_id" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "artists_id" TEXT[] DEFAULT ARRAY[]::TEXT[];

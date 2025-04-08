import HttpError from "../utils/httpError";
import { STATUS_CODES } from "../constants/httpCodes";
import Album, { IAlbum } from "../models/albumModel";
import { CreateAlbumDTO } from "../dto/albumDto";
import { PaginationParams,PaginatedAlbumResponse } from "../dto/paginaionDTO";


/**
 * Creates a new album.
 * @param {CreateAlbumDTO} albumData - The album data.
 * @returns {Promise<AlbumResponseDTO>} - The created album.
 */
export const createAlbum = async (albumData: CreateAlbumDTO): Promise<IAlbum> => {
  const { albumName, artistName, image, user } = albumData;

  // Check if album already exists
  const existingAlbum = await Album.findOne({ albumName, artistName });
  if (existingAlbum) {
    throw new HttpError("Album already exists", STATUS_CODES.CONFLICT);
  }

  // Create and save new album
  const album: IAlbum = await Album.create({
    albumName,
    artistName,
    image,
    user: user,
  });

  return album;
};

/**
 * Gets paginated albums uploaded by a user.
 * @param {string} userId - The user's ID.
 * @param {PaginationParams} pagination - Pagination parameters (page and limit).
 * @returns {Promise<PaginatedAlbumResponse>} - Paginated list of albums.
 */
export const getUserAlbums = async (
  userId: string,
  pagination: PaginationParams = { page: 1, limit: 2 }
): Promise<PaginatedAlbumResponse> => {
  const { page, limit } = pagination;

  // Ensure page and limit are positive numbers
  const pageNum = Math.max(1, page);
  const limitNum = Math.max(1, Math.min(50, limit)); // Cap limit at 100
  
  // Calculate skip value for pagination
  const skip = (pageNum - 1) * limitNum;

  // Get total count of albums
  const total = await Album.countDocuments({ user: userId });

  if (total === 0) {
    throw new HttpError("No albums found for this user", STATUS_CODES.NOT_FOUND);
  }

  // Fetch paginated albums
  const albums: IAlbum[] = await Album.find({ user: userId })
    .skip(skip)
    .limit(limitNum)
    .sort({ createdAt: -1 }); // Optional: sort by creation date descending



  // Calculate pagination metadata
  const totalPages = Math.ceil(total / limitNum);
  const hasNextPage = pageNum < totalPages;
  const hasPrevPage = pageNum > 1;

  return {
    albums,
    total,
    page: pageNum,
    totalPages,
    hasNextPage,
    hasPrevPage,
  };
};
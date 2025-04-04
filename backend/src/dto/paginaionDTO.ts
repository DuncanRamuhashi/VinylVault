import { IAlbum } from "../models/albumModel";

// Interface for pagination parameters
export interface PaginationParams {
    page: number;
    limit: number;
  }
  
  // Interface for paginated response
  export interface PaginatedAlbumResponse {
    albums: IAlbum[];
    total: number;
    page: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  }
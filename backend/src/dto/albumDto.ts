/**
 * DTO (Data Transfer Object) for creating an album.
 */
export interface CreateAlbumDTO {
    albumName: string;
    artistName: string;
    image: string;
    user: string; // User ID as a string
  }
  
 
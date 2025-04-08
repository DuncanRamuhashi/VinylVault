import expressAsyncHandler from "express-async-handler";
import { STATUS_CODES } from "../constants/httpCodes";
import { createAlbum, getUserAlbums } from "../services/albumService";
import { PaginationParams,PaginatedAlbumResponse } from "../dto/paginaionDTO";

export const createAlbumHandler = expressAsyncHandler(async (req , res , next)=>{
 const album = await createAlbum(req.body);

res.status(STATUS_CODES.CREATED).json({success: true, message: "Album created successfully", album});
});

export const getAlbumsHandler = expressAsyncHandler(async(req , res, next )=>{
       const{ user} = req.params;
      
       const  pagination: PaginationParams = {
        page: parseInt(req.query.page as string, 10) || 1,
        limit: parseInt(req.query.limit as string, 10) || 2, // Default to 2 if not provided
     
       };
     
       const result: PaginatedAlbumResponse = await getUserAlbums(user, pagination);
       console.log('this is the total',result);
       // Send the response with the album data
       res.status(STATUS_CODES.OK).json({
         success: true,
         data: result,
       });
}

);

import { z } from 'zod';


export const albumSchemaZod = z.object({
    albumName: z.string().min(1).max(50),
    artistName: z.string().min(1).max(50),
    image: z.string(),
    user: z.string(), 
});


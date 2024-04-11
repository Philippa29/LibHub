import { createContext } from "react";
import { ImageActions, ImageState } from "./interface";



export interface IImageContext{
    image?: ImageState;
    images?: ImageState[];
}

export const initialState: IImageContext = {
    image: null, 
    images: [], // Initialize images as an empty array
}
const initialstate: ImageState = {
    id: '',
    fileName: '',
    fileType: '',
    base64: '',
}

export const ImageActionsContext = createContext<ImageActions>({
    getImage: async (id: string) => '', // Correct the return type to Promise<string>
    getAllImages: async () => [] as ImageState[], // Correct the return type to Promise<ImageState[]>
});

export const ImageStateContext = createContext<IImageContext>(initialState);


export interface ImageActions {
    getImage: (id: string) => Promise<string>;
    getAllImages: () => Promise<ImageState[]>;
    // Add other actions as needed
}


export interface Actions {
    type: string;
    payload: ImageState | ImageState[];
}
  
  export const initialImagesState: ImageState = {
    id: '',
    fileName : '',
    fileType: '',
    base64: '',
} 



export interface ImageState {
    id: string;
    fileName : string;
    fileType: string;
    base64: string;
  }


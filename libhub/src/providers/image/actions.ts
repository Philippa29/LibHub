import { createAction } from 'redux-actions';
import { ImageState } from './interface';

export enum ActionTypes {
    GET_ALL_IMAGES = 'GET_ALL_IMAGES',
    GET_IMAGE = 'GET_IMAGE',
}

export const getImageAction = createAction<string, string>(ActionTypes.GET_ALL_IMAGES, p => p);
export const getImageByIdAction = createAction<string, string>(ActionTypes.GET_IMAGE, p => p);

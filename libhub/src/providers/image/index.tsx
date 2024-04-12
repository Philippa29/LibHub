'use client'

import React, { useContext, useReducer } from 'react';
import { ImageState } from './interface';
import ImageReducer from './reducer';
import { message } from 'antd';
import axios from 'axios';
import { ImageActionsContext, ImageStateContext , initialState} from './context';
import { getImageAction, getImageByIdAction } from './actions';

interface ImageProviderProps {
    children: React.ReactNode;
}

const ImageProvider: React.FC<ImageProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(ImageReducer, initialState);
  
    const getImage = async (id: string): Promise<string> => {
      try {
        const response = await axios.get(`https://localhost:44311/GetStoredFile/${id}`);
        
        dispatch(getImageByIdAction(response.data.result));
        return response.data.base64;
      } catch (error) {
        message.error('Failed to get image');
        throw error;
      }
    };
  
    const getAllImages = async (): Promise<ImageState[]> => {
      try {
        const response = await axios.get('https://localhost:44311/api/services/app/StoredFile/GetAllFiles');
        dispatch(getImageAction(response.data.result));
        return response.data.result;
      } catch (error) {
        message.error('Failed to get images');
        throw error;
      }
    };
  
    return (
      <ImageStateContext.Provider value={state}>
        <ImageActionsContext.Provider value={{ getImage, getAllImages }}>
          {children}
        </ImageActionsContext.Provider>
      </ImageStateContext.Provider>
    );
  };

const useImageState = () => {
    const context = useContext(ImageStateContext);
    if (context === undefined) {
        throw new Error('useImageState must be used within a ImageProvider');
    }
    return context;
}

const useImageActions = () => {
    const context = useContext(ImageActionsContext);
    if (context === undefined) {
        throw new Error('useImageActions must be used within a ImageProvider');
    }
    return context;
}

export { ImageProvider, useImageState, useImageActions };
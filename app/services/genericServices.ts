import {consoleHere, constants, errorToast} from '../core';
import {get} from './request';
import {dispatch} from '../redux';
import {setRandomData, setStoreTiming} from '../redux/modules/genericSlice';

export const makeMediaUrl = async (key: any) => {
  const params = {
    Bucket: 's3',
    Key: key,
    Expires: 3600, // The expiration time in seconds (adjust according to your requirements)
  };

  try {
    const signedUrl = ''
    if (signedUrl) {
      return signedUrl;
    } else {
      return null;
    }
    // Use the signed URL as needed (e.g., pass it to an image component to display the image)
  } catch (error) {
    consoleHere({ErrorGeneratingSignedURL: error});
    return null;
  }
};

export const checkImageExists = async (key: any) => {
  const params = {
    Bucket: 's3',
    Key: key,
  };
  try {
    return true;
  } catch (error: any) {
    if (error.code === 'NotFound') {
      return false;
    }
    throw error;
  }
};

export const getSettingsAPI = async () => {
  get(constants.endPtSettings)
    .then(async res => {
      if (res?.status === constants.apiSuccess) {
        dispatch(setStoreTiming(res?.data));
      } else {
        errorToast(res?.message);
      }
    })
    .catch(e => {
      consoleHere({e});
    });
};

export const getRandomDataAPI = async () => {
  get(constants.endPtGetRandomData)
    .then(async res => {
      if (res?.status === constants.apiSuccess) {
        dispatch(setRandomData(res?.data));
      } else {
        errorToast(res?.message);
      }
    })
    .catch(e => {
      consoleHere({e});
    });
};

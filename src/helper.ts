import {THUMBS_DIR_PATH} from './constants';

const getThumbsFilePath = (
  fileName: string,
  height: number,
  width: number
): string => {
  return `${THUMBS_DIR_PATH}/${fileName}_${height}_${width}.jpg`;
};

export default getThumbsFilePath;

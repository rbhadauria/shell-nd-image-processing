import sharp from 'sharp';
import path from 'path';
import {FULL_DIR_PATH, THUMBS_DIR_PATH} from '../constants';

export const resizeImage = async (
  filename: string,
  height: number,
  width: number
) => {
  console.log(`Resizing Image`);
  const imagePath = path.join(FULL_DIR_PATH, `${filename}.jpg`);
  const outImagePath = path.join(THUMBS_DIR_PATH, `${filename}.jpg`);
  await sharp(imagePath).resize(width, height).toFile(outImagePath);
  return outImagePath;
};

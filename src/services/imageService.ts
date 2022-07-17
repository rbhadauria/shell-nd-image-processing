import sharp from 'sharp';
import path from 'path';
import {FULL_DIR_PATH} from '../constants';

export const resizeImage = async (
  filename: string,
  height: number,
  width: number,
  outImagePath: string
): Promise<void> => {
  const imagePath = path.join(FULL_DIR_PATH, `${filename}.jpg`);
  await sharp(imagePath).resize(width, height).toFile(outImagePath);
};

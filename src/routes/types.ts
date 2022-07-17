import {Request} from 'express';

type ImageResizeRequestQuery = {
  filename: string;
  height: number;
  width: number;
};
export type ImageResizeRequest = Request<
  unknown,
  unknown,
  unknown,
  ImageResizeRequestQuery
>;

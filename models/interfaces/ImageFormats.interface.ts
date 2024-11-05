import { ImageFormat } from "./ImageFormat.interface";

export interface ImageFormats {
  large?: ImageFormat;
  small: ImageFormat;
  medium: ImageFormat;
  thumbnail: ImageFormat;
}

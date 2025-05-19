export enum OutputFormat {
  JPEG = 'jpeg',
  PNG = 'png',
  WEBP = 'webp',
  TIFF = 'tiff',
  AVIF = 'avif',
}

export interface ConvertRequest {
  outputFormat: OutputFormat;
}

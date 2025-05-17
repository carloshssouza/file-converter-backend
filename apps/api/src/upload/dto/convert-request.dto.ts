export type OutputFormat = 'jpeg' | 'png' | 'webp' | 'tiff' | 'avif';

export interface ConvertRequest {
  outputFormat: OutputFormat;
}

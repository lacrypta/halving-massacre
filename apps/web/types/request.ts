// Response interfaces
export interface RequestSuccessResponse {
  success: true;
  pr: string;
  eTag: string;
}
export interface RequestErrorResponse {
  success: false;
  message: string;
}

import { apiSlice } from './apiSlice';

interface FileUploadResponse {
  message: string;
  filePath: string;
  fileName: string;
}

export const fileUploadApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<FileUploadResponse, FormData>({
      query: (formData) => ({
        url: 'upload',
        method: 'POST',
        body: formData,
      }),
    }),
    uploadSyllabus: builder.mutation<FileUploadResponse, FormData>({
      query: (formData) => ({
        url: 'file-upload/upload',
        method: 'POST',
        body: formData,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useUploadFileMutation,
  useUploadSyllabusMutation,
} = fileUploadApi;

import { apiSlice } from "./apiSlice";

export interface IProgramOutComes {
  id: number;
  program_id: number;
  code: string;
  description: string;
}
export interface ICourse {
  id: number;
  program_id: number;
  organization_id: string;
  name: string;
  code: string;
  description: string | null;
  credits: number;
  course_type: string;
  syllabus_file_url: string;
  created_at: string; // or Date if you parse it
  updated_at: string; // or Date if you parse it
}
export type ICourseOutComes = {
  id: number;
  program_id: number;
  organization_id: string;
  name: string;
  code: string;
  description: string;
  credits: number;
  course_type: "core" | "elective" | "lab"; // enum from your Prisma model
  syllabus_file_url: string;
  created_at: string; // or Date if you parse it
  updated_at: string; // or Date if you parse it
};
export interface ICoPoMapping {
  id: number;
  course_id: number;
  co_label: string;
  po_label: string;
  value: number;
  program_outcome_description: string;
  course_outcome_content: string;
}
// Inject endpoints into the base API slice
export const programManagementApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProgramsList: builder.query<IProgramOutComes[], void>({
      query: () => "/programs",
    }),

    getProgramOutComesById: builder.query<IProgramOutComes[], string>({
      query: (programId) => `/program-outcomes/program/${programId}`,
      providesTags: (result, error, id) => [{ type: "Program", id }],
    }),
    createProgramOutcome: builder.mutation<IProgramOutComes, { program_id: number; code: string; description: string }>(
      {
        query: (newOutcome) => ({
          url: "/program-outcomes",
          method: "POST",
          body: newOutcome,
        }),
        invalidatesTags: [{ type: "Program", id: "LIST" }],
      }
    ),
    getCoursesByProgramId: builder.query<ICourse[], string>({
      query: (programId) => `/syllabus/course/${programId}`,
      providesTags: (result, error, id) => [{ type: "Course", id }],
    }),
    getOutComesbyCourseId: builder.query<ICourseOutComes[], string>({
      query: (courseId) => `/syllabus/course-outcomes/${courseId}`,
      providesTags: (result, error, id) => [{ type: "Course", id }],
    }),
    getCopoMappingbyCourseId: builder.query<ICoPoMapping[], string>({
      query: (courseId) => `/syllabus/co-po-mappings/${courseId}`,
      providesTags: (result, error, id) => [{ type: "Course", id }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProgramsListQuery,
  useGetProgramOutComesByIdQuery,
  useCreateProgramOutcomeMutation,
  useGetCoursesByProgramIdQuery,
  useGetOutComesbyCourseIdQuery,
  useGetCopoMappingbyCourseIdQuery,
} = programManagementApi;

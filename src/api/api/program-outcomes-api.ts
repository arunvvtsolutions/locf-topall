import { apiSlice } from "./apiSlice";

export interface IProgramOutComes {
  id: number;
  program_id: number;
  code: string;
  description: string;
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
  }),
  overrideExisting: false,
});

export const { useGetProgramsListQuery, useGetProgramOutComesByIdQuery, useCreateProgramOutcomeMutation } =
  programManagementApi;

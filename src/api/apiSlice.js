import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

// const { getTokenCookie } = useCookies();

const customBaseQuery = fetchBaseQuery({
  baseUrl: 'http://127.0.0.1:3000/v1',

  prepareHeaders: (headers) => {
    // Get your token from wherever you have it stored
    const userToken = Cookies.get('bookADocUserToken');

    if (userToken) {
      // Set the 'Authorization' header with the token
      headers.set('Authorization', `Bearer ${userToken}`);
      headers.set('x-access-token', userToken);
    }

    return headers;
  },
});

export const apiSLice = createApi({
  baseQuery: customBaseQuery,

  tagTypes: ['getEmployee', 'JobAlert', 'savedJobs', 'jobs', 'shifts', 'Teams'],

  // All endpoints
  endpoints: (builder) => ({
    // get user data
    getEmployee: builder.query({
      query: (id) => `/employee/${id}`,

      //   the param here is the id, hence the reason for id: arg
      providesTags: [{ type: 'getEmployee', id: 'LIST' }],
    }),

    // get user data
    getEmployer: builder.query({
      query: (id) => `/employer/${id}`,
    }),

    // Update user data in server
    updateUser: builder.mutation({
      query: (formData) => ({
        url: `/employee/updateuser`,
        method: 'POST',
        body: formData,
      }),

      //   after updating user data, refetch the getEmployer endpoints to update the screen without reload
      invalidatesTags: [{ type: 'getEmployee', id: 'LIST' }],
    }),

    getUpComingShifts: builder.query({
      query: (formData) => ({
        url: `/jobs/employee-upcoming-shifts`,
        method: 'POST',
        body: formData,
      }),
      providesTags: [{ type: 'shifts', id: 'List' }],
    }),

    getAllJobs: builder.query({
      query: (formData) => ({
        url: `/jobs/findjobs`,
        method: 'POST',
        body: formData,
      }),
    }),

    applyForShift: builder.mutation({
      query: (formData) => ({
        url: `/jobs/Employee-apply-for-shift`,
        method: 'POST',
        body: formData,
      }),

      invalidatesTags: [{ type: 'shifts', id: 'List' }],
    }),

    changePassword: builder.mutation({
      query: (formData) => ({
        url: `/employee/change-password`,
        method: 'POST',
        body: formData,
      }),
    }),

    getJobAlert: builder.query({
      query: (formData) => ({
        url: `/jobalerts/get-job-alert`,
        method: 'POST',
        body: formData,
      }),

      providesTags: [{ type: 'JobAlert', id: 'ALERT' }],
    }),

    addJobAlert: builder.mutation({
      query: (formData) => ({
        url: `/jobalerts/create`,
        method: 'POST',
        body: formData,
      }),

      invalidatesTags: [{ type: 'JobAlert', id: 'ALERT' }],
    }),

    updateJobAlert: builder.mutation({
      query: (formData) => ({
        url: `/jobalerts/update`,
        method: 'POST',
        body: formData,
      }),

      invalidatesTags: [{ type: 'JobAlert', id: 'ALERT' }],
    }),

    deleteJobAlertById: builder.mutation({
      query: (id) => ({
        url: `/jobalerts/${id}`,
        method: 'delete',
      }),

      invalidatesTags: [{ type: 'JobAlert', id: 'ALERT' }],
    }),

    getSavedJobs: builder.query({
      query: (formData) => ({
        url: `/savedjobs/get-employee-saved-jobs`,
        method: 'POST',
        body: formData,
      }),

      providesTags: [{ type: 'savedJobs', id: 'SJobs' }],
    }),

    addSavedJobs: builder.mutation({
      query: (formData) => ({
        url: `/savedjobs/create`,
        method: 'POST',
        body: formData,
      }),

      invalidatesTags: [{ type: 'savedJobs', id: 'SJobs' }],
    }),

    deleteSavedJobById: builder.mutation({
      query: (id) => ({
        url: `/savedjobs/${id}`,
        method: 'delete',
      }),

      invalidatesTags: [{ type: 'savedJobs', id: 'SJobs' }],
    }),

    getEmployeeShifts: builder.query({
      query: (formData) => ({
        url: `/jobs/employee-find-shifts-by-acceptance`,
        method: 'POST',
        body: formData,
      }),
      providesTags: [{ type: 'shifts', id: 'List' }],
    }),

    getSingleJobById: builder.query({
      query: (id) => `/jobs/${id}`,
    }),

    updateJobStatus: builder.mutation({
      query: (formData) => ({
        url: `/jobs/update-employee-acceptance`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: 'shifts', id: 'List' }],
    }),

    getSubscribedPlan: builder.mutation({
      query: (formData) => ({
        url: `/payments`,
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: 'getEmployee', id: 'LIST' }],
    }),

    confirmSubValiditiy: builder.query({
      query: ({ userId, payId }) => `/payments/${userId}/${payId}/validity`,
    }),

    checkBookedJobs: builder.query({
      query: (formData) => ({
        url: `/jobs/check`,
        method: 'POST',
        body: formData,
      }),
      providesTags: [{ type: 'shifts', id: 'List' }],
    }),

    deleteJobById: builder.mutation({
      query: (id) => ({
        url: `/jobs/deleteemployee/${id}`,
        method: 'delete',
      }),

      invalidatesTags: [{ type: 'jobs', id: 'LIST' }],
    }),

    getAllRatings: builder.query({
      query: (id) => `/reviews/employee_get_review/${id}`,
    }),
  }),
});

export const {
  useGetAllRatingsQuery,
  useDeleteJobByIdMutation,
  useConfirmSubValiditiyQuery,
  useCheckBookedJobsQuery,
  useGetSubscribedPlanMutation,
  useUpdateJobStatusMutation,
  useGetEmployeeShiftsQuery,
  useChangePasswordMutation,
  useGetEmployerQuery,
  useGetEmployeeQuery,
  useUpdateUserMutation,
  useGetUpComingShiftsQuery,
  useGetAllJobsQuery,
  useApplyForShiftMutation,
  useGetJobAlertQuery,
  useAddJobAlertMutation,
  useUpdateJobAlertMutation,
  useDeleteJobAlertByIdMutation,
  useGetSavedJobsQuery,
  useAddSavedJobsMutation,
  useDeleteSavedJobByIdMutation,
  useGetSingleJobByIdQuery,
} = apiSLice;

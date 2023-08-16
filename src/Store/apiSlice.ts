import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
export const apiSlice = createApi({
    reducerPath: 'apiSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_BASE_URL
    }),
    endpoints: (builder) => ({
        getPosts: builder.query({
            query: ({ url, method, payload, requestCount }) => {
                let headers: any = {
                    'Content-Type': 'application/json',
                    'X-Request-Count': requestCount
                };

                const token: string | null = localStorage.getItem('token');

                if (token) {
                    headers = {
                        ...headers,
                        Authorization: 'Bearer '.concat(token)
                    };
                }

                let parameter: any = {
                    url: url,
                    method: method,
                    headers
                };

                if (String(method).toLowerCase() === 'get') {
                    parameter = { ...parameter, params: payload };
                } else {
                    parameter = { ...parameter, body: payload };
                }

                return parameter;
            },
            transformErrorResponse: ({ status, data }) => {
                if (status == 401 || status == 403) {
                    location.href = '/login';
                }
                return data;
            }
        })
    })
});
export default apiSlice;

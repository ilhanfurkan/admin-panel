import React, { useEffect } from 'react';
import apiSlice from '../Store/apiSlice';
import { useAppDispatch } from '../Store/hooks';
import CheckNotEmpty from './CheckNotEmpty';

export interface RequestParams {
    mode: string;
    payload?: any;
}

export interface RequestProps {
    params: RequestParams;
    onSuccess?: any;
}

export default function RequestComponent({
    url,
    method,
    payload,
    reduce,
    requestCount,
    onSuccess
}: any) {
    const dispatch = useAppDispatch();

    method = method ? method.toUpperCase() : 'GET';

    const {
        data = [],
        isLoading,
        isFetching,
        isError
    } = apiSlice.useGetPostsQuery({
        url,
        method,
        payload,
        requestCount
    });

    useEffect(() => {
        if (CheckNotEmpty(data)) {
            reduce &&
                dispatch({
                    type: reduce,
                    payload: data
                });
        }
        onSuccess && onSuccess(data);
    }, [data]);

    if (isError) return <>Alert!!!</>;
    if (isLoading) return <>Loading...</>;
    if (isFetching) return <>Please Wait...</>;

    return <></>;
}

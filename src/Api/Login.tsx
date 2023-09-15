import React, { useEffect, useState } from 'react';
import RequestComponent from '../Utils/RequestComponent';

export default function Login({ params, onSuccess }: any) {
    const [requestCount, setRequestCount] = useState(0);

    const [url, setUrl] = useState('');
    const [method, setMethod] = useState('');
    const [payload, setPayload] = useState({});
    const [reduce, setReduce] = useState('');

    useEffect(() => {
        setRequestCount(requestCount + 1);

        switch (params.mode) {
            case 'login':
                setUrl('/balance-blog/login');
                setMethod('POST');
                setPayload(params.payload);
                setReduce('login/getJwtToken');
                break;
        }
    }, [params]);

    return url ? (
        <RequestComponent
            url={url}
            method={method}
            payload={payload}
            reduce={reduce}
            requestCount={requestCount}
            onSuccess={(data: any) => onSuccess && onSuccess(data)}
        />
    ) : (
        <></>
    );
}

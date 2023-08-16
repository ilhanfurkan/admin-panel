import React, { useEffect, useState } from 'react';
import RequestComponent from '../Utils/RequestComponent';

export default function DefaultRequest({ params, onSuccess }: any) {
    const [requestCount, setRequestCount] = useState(0);

    const [url, setUrl] = useState('');
    const [method, setMethod] = useState('');
    const [payload, setPayload] = useState({});
    const [reduce, setReduce] = useState('');

    useEffect(() => {
        setRequestCount(requestCount + 1);

        switch (params.mode) {
            case 'list':
                setUrl('/products');
                setMethod('get');
                setReduce('default/fillList');
                break;
            case 'get':
                setUrl(`/products/${params.payload.id}`);
                setMethod('get');
                setReduce('default/fillItem');
                break;
            case 'save':
                setUrl('/products');
                setMethod('post');
                setPayload(params.payload);
                // setReduce('default/setStatus');
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

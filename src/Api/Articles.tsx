import React, { useEffect, useState } from 'react';
import RequestComponent from '../Utils/RequestComponent';

export default function Articles({ params, onSuccess }: any) {
    const [requestCount, setRequestCount] = useState(0);

    const [url, setUrl] = useState('');
    const [method, setMethod] = useState('');
    const [payload, setPayload] = useState({});
    const [reduce, setReduce] = useState('');

    useEffect(() => {
        setRequestCount(requestCount + 1);

        switch (params.mode) {
            case 'articleList':
                setUrl('/balance-blog/blogs');
                setMethod('get');
                setReduce('article/getList');
                break;
            case 'createArticle':
                setUrl('/balance-blog/blogs');
                setMethod('post');
                setPayload(params.payload);
                break;
            case 'editArticle':
                setUrl(`/balance-blog/blogs/${params.payload.id}`);
                setMethod('post');
                setPayload(params.payload);
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

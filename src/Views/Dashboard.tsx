import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../Store/hooks';
import { RootState, actions } from '../Store';
import DefaultRequest from '../Api/DefaultRequest';
import { RequestParams } from '../Utils/RequestComponent';

import '../App.css';

export default function Dashboard() {
    const opened = useAppSelector((state: RootState) => state.mainMenu.status);
    const products = useAppSelector((state: RootState) => state.default.list);
    const product = useAppSelector((state: RootState) => state.default.item);

    const dispatch = useAppDispatch();

    const handleOpen = () => dispatch(actions.mainMenu.menuOpen(true));
    const handleClose = () => dispatch(actions.mainMenu.menuOpen(false));

    const handleRequest = () => {
        setProductRequest({
            mode: 'list',
            payload: {}
        });
    };

    const handleRequestItem = () => {
        setProductRequest({
            mode: 'get',
            payload: {
                id: 1
            }
        });
    };

    const handleResponse = (response: any) => {
        console.log('Response:', response);
    };

    const [productRequest, setProductRequest] = useState<RequestParams>({
        mode: '',
        payload: {}
    });

    return (
        <div className="App">
            <DefaultRequest
                params={productRequest}
                onSuccess={(response: any) => handleResponse(response)}
            />
            <div className="navigate">
                <input type="button" value="Open" onClick={handleOpen} />
                <input type="button" value="Close" onClick={handleClose} />
                <input
                    type="text"
                    name="value"
                    id="value"
                    value={'' + opened}
                />
                <input type="button" value="Get List" onClick={handleRequest} />
                <input
                    type="button"
                    value="Get Item"
                    onClick={handleRequestItem}
                />
            </div>
            <hr />
            <textarea
                rows={20}
                cols={70}
                value={JSON.stringify(products)}
            ></textarea>
            <textarea
                rows={20}
                cols={70}
                value={JSON.stringify(product)}
            ></textarea>
            <hr />
        </div>
    );
}

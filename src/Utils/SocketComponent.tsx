import React, { useEffect } from 'react';
import { useAppDispatch } from '../Store/hooks';
import wsSlice from '../Store/wsSlice';
import CheckNotEmpty from './CheckNotEmpty';

export default function SocketComponent({ channel, payload, onSuccess }: any) {
    const dispatch = useAppDispatch();

    const { data }: any = wsSlice.useGetMessagesQuery(channel ? channel : '');

    const [sendMessage] = wsSlice.useSendMessageMutation();

    useEffect(() => {
        dispatch({
            type: 'chat/clearChats'
        });

        payload && sendMessage(payload);
    }, [payload]);

    useEffect(() => {
        if (CheckNotEmpty(data)) {
            if (channel) {
                dispatch({
                    type: 'chat/write',
                    payload: {
                        id: channel,
                        data
                    }
                });
            } else {
                switch (data.type) {
                    case 'rooms':
                        dispatch({
                            type: 'chat/setRooms',
                            payload: data.data
                        });
                        break;
                    case 'join':
                        dispatch({
                            type: 'chat/setInfo',
                            payload: data.data
                        });
                        break;
                    default:
                        dispatch({
                            type: 'chat/setChats',
                            payload: data
                        });
                }
            }

            onSuccess && onSuccess(data);
        }
    }, [data]);

    return <></>;
}

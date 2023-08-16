import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Message {
    request: any;
    response: any;
}

let ws: any = null;

export const wsSlice = createApi({
    reducerPath: 'wsSlice',
    baseQuery: fetchBaseQuery({ baseUrl: '/' }),
    endpoints: (build) => ({
        sendMessage: build.mutation<Message, any>({
            queryFn: (chatMessage: any) => {
                return new Promise((resolve, reject) => {
                    try {
                        ws.send(JSON.stringify(chatMessage));
                    } catch (e) {
                        reject(e);
                    }
                });
            },
        }),
        getMessages: build.query({
            queryFn: () => ({ data: {} }),
            async onCacheEntryAdded(
                endpoint,
                { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
            ) {
                ws = new WebSocket(`${process.env.REACT_APP_WS}/chat`);
                try {
                    await cacheDataLoaded;

                    const listener = (event: MessageEvent) => {
                        const data = JSON.parse(event.data);

                        if (typeof data === 'object') {
                            updateCachedData(() => {
                                return data;
                            });
                        }
                    };

                    ws.addEventListener('message', listener);

                    await cacheEntryRemoved;
                } catch (e) {
                    console.error('Socket Err:', e);
                }

                await cacheEntryRemoved;

                ws.close();
            },
        }),
    }),
});

export default wsSlice;

import {useCallback, useEffect, useRef, useState} from 'react';
import beautifyUrl from 'utils/beautifyUrl';
import axios from 'config/api';

const configDefaults = {
    headers: {},
    params: {},
    query: {},
    skip: false,
};

function useGet(path, config = {}) {
    const {
        headers = {},
        params = {},
        query = {},
        onSuccess,
        onFailure,
        skip = false,
        responseType,
        downloadBlob,
    } = config;

    const [loading, setLoading] = useState(!skip);
    const [data, setData] = useState(undefined);
    const [error, setError] = useState(null);
    const unMounted = useRef(false);

    const fetch = useCallback(
        async (newConfig = {}) => {
            const currConfig = {...configDefaults, ...config, ...newConfig};

            if (currConfig.customSkipFn) {
                const skip = currConfig.customSkipFn({...currConfig});
                if (skip) {
                    setLoading(false);
                    return;
                }
            }

            setLoading(true);

            try {
                let response = await axios.get(beautifyUrl(path, currConfig), {
                    headers: {...headers},
                    responseType: responseType || (downloadBlob ? 'blob' : undefined),
                });
                response = response.data;

                if (!unMounted.current) {
                    setData(response);
                    setLoading(false);

                    if (onSuccess) {
                        onSuccess(response);
                    }
                }
            } catch (err) {
                let e = err.response;
                let status = 500;

                if (e) {
                    status = e.status;
                    e = e?.data?.error || 'Server Error';
                } else {
                    e = 'Server Error';
                }

                if (!unMounted.current) {
                    setData(undefined);
                    setError(e);
                    setLoading(false);

                    if (onFailure) {
                        onFailure(e, status);
                    }
                }
            }
        },
        [JSON.stringify(params), JSON.stringify(query)],
    );

    useEffect(() => {
        if (!skip) fetch();

    }, [fetch]);

    useEffect(
        () => () => {
            unMounted.current = true;
        },
        [],
    );

    return {
        loading,
        error,
        data,
        fetch,
        setData,
    };
}

export default useGet;

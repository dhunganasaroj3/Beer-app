import useGet from "hooks/useGet";
import {API_URL} from "./constants";

const useApiServices = () => {
    const {
        data,
        loading,
        fetch
    } = useGet(API_URL, {
        query: {
            page: 1,
            per_page: 3
        }
    });

    return {
        serverState: {
            data,
            loading
        },
        serverActions: {
            fetch
        }
    }
}

export default useApiServices;
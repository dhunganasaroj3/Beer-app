import { useReducer } from "react";


const initialArgs = [];

const useBeerReducer = () => {
    const [beerData, dispatchBeerData] = useReducer((state, action) => {
        switch(action.type){
            case 'append_to_state':
                return [...state, ...action.payload];
            default:
                return [];
        }
    }, initialArgs)

    return {
        beerData,
        dispatchBeerData
    }
};

export default useBeerReducer;
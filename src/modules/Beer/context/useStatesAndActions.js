import useApiServices from "./useApiServices";
import useBeerReducer from "./reducers/useBeerReducer";

const useStatesAndActions = () => {
    const {beerData, dispatchBeerData} = useBeerReducer();
    const {serverState, serverActions} = useApiServices();

    const states = {
        beerData,
        ...serverState
    };

    const actions = {
        dispatchBeerData,
        ...serverActions
    }
    return [states, actions];
};

export default useStatesAndActions;
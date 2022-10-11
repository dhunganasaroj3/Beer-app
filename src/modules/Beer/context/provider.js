import BeerContext from './context';
import useStatesAndActions from './useStatesAndActions';
const BeerProvider = ({ children }) => (
    <BeerContext.Provider value={useStatesAndActions()}>
        {children}
    </BeerContext.Provider>
);
export default BeerProvider;

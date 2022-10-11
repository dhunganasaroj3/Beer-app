import React, { useLayoutEffect } from 'react';
import useBeerContext from "./context/useBeerContext";
import BeerProvider from "./context/provider";
import {Box, Grid} from "@mui/material";
import BeerRow from "./Row";
import Pagination from "./Pagination";

const style = {color: '#767676'};

const Beer = () => {
    const [{ data, beerData }, { dispatchBeerData }] = useBeerContext();

    useLayoutEffect(() => {
        if(data?.length){
            dispatchBeerData({
                type: 'append_to_state',
                payload: data
            })
        }
    }, [data])

    return (
        <Box>
            <Box component="h1" sx={style}>Beers</Box>
            <Grid container spacing={2}>
                {beerData?.map(beer => (
                    <BeerRow key={beer?.id} beer={beer} />
                ))}
                <Pagination />
            </Grid>
        </Box>
    );
};
const WithContext = () => (
    <BeerProvider>
        <Beer/>
    </BeerProvider>
)
export default WithContext;

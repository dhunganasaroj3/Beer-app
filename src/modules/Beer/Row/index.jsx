import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, CardContent, Grid, Tooltip } from "@mui/material";
import FitAvatar from "components/FitAvatar";
import PointerCard from "components/PointerCard";

const BeerRow = ({beer}) => {

    const changeStyleOnMouseOver = useCallback(({currentTarget: { style }}) => {
        style.background = "rgb(242 248 253)"
        style.boxShadow = "none"
    }, []);

    const changeStyleOnMouseOut = useCallback(({currentTarget: { style }}) => {
        style.background = "";
        style.boxShadow = '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)';
    }, []);

    const ingredients = useMemo(() => (`ingredients: ${Object.keys(beer?.ingredients || {})?.join(', ')}`), [beer?.ingredients])

    return (
        <>
            <Grid item xs={12} md={12} lg={12} sx={{m: 1}}>
                <PointerCard raised onMouseOver={changeStyleOnMouseOver} onMouseOut={changeStyleOnMouseOut}>
                    <CardContent>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} md={2}>
                                <Tooltip
                                    title={ingredients}
                                    onMouseOver={(e) => e.stopPropagation()}
                                    placement="top"
                                    sx={{
                                        height: 150,
                                        width: 150
                                    }}
                                    arrow>
                                    <FitAvatar src={beer?.image_url} variant='square'/>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12} md={9}>
                                <Box>
                                    <Box component="h1">{beer?.name}</Box>
                                    <Box component="h3" sx={{color: '#d7b500'}}>{beer?.tagline}</Box>
                                    <Box component="p">{beer?.description}</Box>
                                </Box>
                            </Grid>
                        </Grid>

                    </CardContent>
                </PointerCard>
            </Grid>
        </>
    );
};

BeerRow.propTypes = {
    beer: PropTypes.object
};

export default BeerRow;

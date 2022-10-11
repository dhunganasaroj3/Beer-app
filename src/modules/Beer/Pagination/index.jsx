import React, {useCallback} from 'react';
import {KeyboardArrowDown} from "@mui/icons-material";
import {Box, CircularProgress, Grid} from "@mui/material";
import {useState} from "react";
import useBeerContext from "modules/Beer/context/useBeerContext";
import LoadMoreBox from "components/LoadMoreBox";
import HideChildren from "components/HideChildren";

const Pagination = () => {
    const [{ loading },{fetch}] = useBeerContext();
    const [page, setPage] = useState(1);

    const handleFetchData = useCallback(() => {
        fetch({
            query: {
                page: page + 1,
                per_page: 10
            }
        });
        setPage((prevState) => prevState + 1);
    }, [page])

    return (
        <Grid sx={{m: 'auto', mt: 5}} onClick={handleFetchData}>
            <HideChildren status={!loading}>
                <Box display="flex" justifyContent="space-around">
                    <CircularProgress />
                </Box>
            </HideChildren>
            <HideChildren status={loading}>
                <LoadMoreBox>Load More <KeyboardArrowDown /></LoadMoreBox>
            </HideChildren>
        </Grid>
    );
};

export default Pagination;

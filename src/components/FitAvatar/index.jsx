import {styled} from "@mui/styles";
import {Avatar} from "@mui/material";

const FitAvatar = styled(Avatar)({
    '& .MuiAvatar-img': {
        objectFit: 'contain',
    }
});

export default FitAvatar;
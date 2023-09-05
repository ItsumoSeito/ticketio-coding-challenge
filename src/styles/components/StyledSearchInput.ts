import { styled } from '@mui/material/styles';
import { OutlinedInput, type OutlinedInputProps } from '@mui/material';

var StyledSearchInput = styled(OutlinedInput)<OutlinedInputProps>({
    '&:not(.Mui-focused):not(:hover)': {
        '.MuiOutlinedInput-notchedOutline': {
            border: '0',
        },
    },
    '&.Mui-focused': {
        '.MuiOutlinedInput-notchedOutline': {
            'border-color': '#000000',
        },
    },
});

export default StyledSearchInput;

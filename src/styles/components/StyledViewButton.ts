import { styled } from '@mui/material/styles';
import { Button, type ButtonProps } from '@mui/material';
import design from '@/styles/exportedStyles.module.scss';

interface StyledButtonProps extends ButtonProps {
    active?: boolean;
}

var StyledViewButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'active',
})<StyledButtonProps>(function getStyle({ active }) {
    return {
        ...(active === true && { backgroundColor: '#000000' }),
        width: '3rem',
        height: '3rem',
        padding: '0',
        minWidth: '0',
        borderRadius: design.borderRadiusMd,
        ':hover': {
            backgroundColor:
                active === true
                    ? design.colorBackgroundLightBlack
                    : design.colorBackgroundLightGrey,
        },
        img: {
            width: '2.5rem',
            height: '2.5rem',
            objectFit: 'contain',
            filter: active === true ? 'invert(1)' : '',
        },
    };
});

export default StyledViewButton;

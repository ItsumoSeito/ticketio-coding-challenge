import { styled } from '@mui/material/styles';
import { Button, type ButtonProps } from '@mui/material';
import { type ViewTypes } from '@/utils/types';
import { viewTypes } from '@/utils/view';
import design from '@/styles/exportedStyles.module.scss';

interface StyledButtonProps extends ButtonProps {
    forViewType: ViewTypes;
}

var StyledActionButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'forViewType',
})<StyledButtonProps>(function getStyle({ forViewType }) {
    return {
        backgroundColor: '#000000',
        width:
            forViewType === viewTypes.gallery
                ? design.buttonWidthMd
                : design.buttonWidthSm,
        height:
            forViewType === viewTypes.gallery
                ? design.buttonHeightMd
                : design.buttonHeightSm,
        borderRadius: design.borderRadiusMd,
        color: '#ffffff',
        font: design.fontTextSansRule,
        textTransform: 'none',
        ':hover': {
            backgroundColor: design.colorBackgroundLightBlack,
        },
    };
});

export default StyledActionButton;

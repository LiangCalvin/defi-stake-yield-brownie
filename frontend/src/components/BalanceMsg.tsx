import { makeStyles } from "@mui/material/styles"
import { useTheme } from '@mui/material/styles';

export interface BalanceMsgProps {
    label: string
    amount: number
    tokenImgSrc: string
}

export const BalanceMsg = ({ label, amount, tokenImgSrc }: BalanceMsgProps) => {

    const theme = useTheme();

    const containerStyles = {
        display: "inline-grid",
        gridTemplateColumns: "auto auto auto",
        gap: theme.spacing(1),
        alignItems: "center",
    }
    const tokenImgStyle: React.CSSProperties = {
        width: "32px",
    };
    const amountStyle: React.CSSProperties = {
        fontWeight: 700,
    };

    return (
        <div style={containerStyles}>
            <div>{label}</div>
            <img src={tokenImgSrc} alt="token logo" style={tokenImgStyle} />
            <div style={amountStyle}>{amount ?? "Loading..."}</div>
        </div>
    )
}
import { Tooltip, IconButton, CircularProgress } from "@mui/material";

export default function ButtonIcon({ loading, disabled, children, size = 'sm', title, onClick, sx = {}, color = 'inherit' }) {
    return (
        <Tooltip
            title={title}

        >
            <IconButton size={size} disabled={disabled} onClick={onClick} sx={{ ...(sx ? sx : {}), }} color={color}>
                {loading ? <CircularProgress size={25} color={color} /> : children}
            </IconButton>
        </Tooltip>
    );
}
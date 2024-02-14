import { Tooltip, IconButton, CircularProgress } from "@mui/material";

export default function ButtonIcon({ loading, disabled, children, size = 'sm', title, onClick, sx = { fontSize: '1.2rem' }, color = 'inherit' }) {
    return (
        <Tooltip
            title={title}
        >
            {!loading ? <IconButton size={size} disabled={disabled} onClick={onClick} sx={sx} color={color}>
                {children}
            </IconButton> : <CircularProgress size={20} />}
        </Tooltip>
    );
}
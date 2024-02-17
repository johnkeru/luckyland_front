import { Tooltip, IconButton, CircularProgress } from "@mui/material";

export default function ButtonIcon({ loading, disabled, children, size = 'sm', title, onClick, sx = {}, color = 'inherit' }) {
    return (
        <Tooltip
            title={title}
            sx={{
                ...(sx ? sx : {}),
            }}
        >
            {!loading ? <IconButton size={size} disabled={disabled} onClick={onClick} sx={sx} color={color}>
                {children}
            </IconButton> : <CircularProgress size={25} sx={{ mt: .8, }} color={color} />}
        </Tooltip>
    );
}
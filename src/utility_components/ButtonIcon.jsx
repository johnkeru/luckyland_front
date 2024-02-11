import { Tooltip, Button } from "@material-tailwind/react";

export default function ButtonIcon({ loading, disabled, children, variant = 'outlined', size = 'sm', className = undefined, title, color = 'red', onClick = () => undefined }) {
    return (
        <Tooltip
            content={title}
            animate={{
                mount: { scale: .9, y: 0 },
                unmount: { scale: 0, y: .25 },
            }}
        >
            <Button variant={variant} size={size} className={className + ' px-2 flex items-center gap-1'} disabled={disabled} color={color} onClick={onClick} loading={loading}>
                {children}
            </Button>
        </Tooltip>
    );
}
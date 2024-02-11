import { Tooltip, } from "@material-tailwind/react";

export default function TooltipIcon({ children, title = 'title' }) {
    return (
        <Tooltip
            content={title}
            animate={{
                mount: { scale: 0.8, y: 0 },
                unmount: { scale: 0, y: 0.8 },
            }}
        >
            {children}
        </Tooltip>
    );
}
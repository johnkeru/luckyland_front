import {
    DialogContent,
    Typography
} from "@mui/material";
import React from "react";
import { FaRegCalendarCheck } from "react-icons/fa";
import { MdOutlineInventory } from "react-icons/md";
import InventoryStatusChip from "../../../components/inventory/InventoryStatusChip";
import { resizeCloudinaryImage } from "../../../utility_functions/cloudinaryUrl";
import { formatDate } from '../../../utility_functions/formatTime';
import Modal from '../Modal';

export default function View_Inventory_Modal({ data, button }) {

    const added_by = data.added_by;
    const inv = data
    const image = data?.image || 'https://res.cloudinary.com/kerutman/image/upload/v1686224017/no_image.jpg'

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);

    return (
        <Modal
            button={button}
            handleClose={handleOpen}
            maxWidth="lg"
            handleOpen={handleOpen}
            open={open}
            title={<div className="flex items-stretch gap-3.5">
                <div className="flex grow basis-[0%] flex-col items-stretch">
                    <div className=" text-3xl whitespace-nowrap flex items-center gap-2">
                        {inv.productName + ' '}
                        <InventoryStatusChip status={inv.status} />
                    </div>
                    <div className="text-sm flex items-center gap-3 font-normal my-1">
                        {formatDate(inv.lastUpdated)}
                        <FaRegCalendarCheck className="w-4 h-4" title="last checked" />
                        |
                        <div className="text-sm flex items-center gap-3 font-normal my-1">
                            {added_by.firstName} {added_by.middleName} {added_by.lastName}
                            <MdOutlineInventory className="w-4 h-4" title="modified by" />
                        </div>
                    </div>
                </div>
            </div>}
            children={<DialogContent dividers>

                <img
                    loading="lazy"
                    srcSet={resizeCloudinaryImage(image, 400, 400)}
                    className="object-cover object-center w-full h-[300px] bg-gray-200"
                />
                <div className="text-black text-sm mt-4 max-md:max-w-full">
                    {inv.description ? <Typography color="black" size="sm">
                        {inv.description}
                    </Typography> : undefined}
                </div>

                <div className="flex items-stretch justify-between gap-5 mt-4 mb-1 pr-20 max-md:max-w-full max-md:flex-wrap max-md:pr-5">

                    <div className="flex flex-col items-stretch">
                        <Typography color="black" size="sm">
                            Current quantity: <span className="font-bold">{inv.currentQuantity}</span>
                        </Typography>

                        <Typography color="black" size="sm" mt={2}>
                            Max quantity: <span className="font-bold">{inv.maxQuantity}</span>
                        </Typography>

                        <Typography color="black" size="sm" mt={2}>
                            Re-order point: <span className="font-bold">{inv.reOrderPoint}</span>
                        </Typography>
                    </div>

                    <div className="flex flex-col items-stretch self-start">
                        {inv.price ? <Typography color="black" size="sm">
                            Price: <span className="font-bold">{inv.price}</span>
                        </Typography> : undefined}

                        {inv.supplier ? (
                            <Typography color="black" size="sm" mt={2}>
                                Supplier: <span className="font-bold">{inv.supplier}</span>
                            </Typography>
                        ) : undefined}

                        {inv.customers_who_borrows_count !== 0 ? (
                            <Typography color="black" size="sm" mt={2}>
                                Borrowers: <span className="font-bold">{inv.customers_who_borrows_count}</span>
                            </Typography>
                        ) : undefined}
                    </div>
                </div>
            </DialogContent>}
        />

    );
}

import { Avatar } from "@material-tailwind/react";

export default function AvatarProfile({ image }) {
    const src = image || `https://res.cloudinary.com/kerutman/image/upload/v1704497755/noimage_s61lqx.png`
    return <Avatar src={src} alt="avatar" className="w-8 h-8" />;
}
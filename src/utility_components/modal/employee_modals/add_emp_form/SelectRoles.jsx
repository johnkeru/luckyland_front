import { Checkbox, Typography } from "@material-tailwind/react";
import React from "react";
import useRole from "../../../../hooks/useRoles";

export default function SelectRoles({ selectedRoleIds, setSelectedRoleIds, step2Error, setStep2Error }) {
    const { roles } = useRole();

    const handleCheckboxChange = (roleId) => {
        setStep2Error('');
        setSelectedRoleIds((prevSelectedRoleIds) => {
            if (prevSelectedRoleIds.includes(roleId)) {
                // If the role ID is already selected, remove it
                return prevSelectedRoleIds.filter((selectedRoleId) => selectedRoleId !== roleId);
            } else {
                // If the role ID is not selected, add it
                return [...prevSelectedRoleIds, roleId];
            }
        });
    };


    return (
        <div className="grid mb-4">
            <Typography className="block text-gray-800 font-bold mb-1">Select Roles {step2Error && <span className="font-normal text-red-500 text-sm ml-1">*{step2Error}</span>}</Typography>
            <div className="flex gap-2">
                <div>
                    {
                        roles.length !== 0 ?
                            roles.slice(0, 2).map(role => (
                                <Checkbox
                                    key={role.id}
                                    checked={selectedRoleIds.includes(role.id)}
                                    onChange={() => handleCheckboxChange(role.id)}
                                    label={
                                        <div className="mb-2">
                                            <Typography color="blue-gray" className="font-medium">
                                                {role.roleName}
                                            </Typography>
                                            <Typography variant="small" color="gray" className="font-normal">
                                                {role.description}
                                            </Typography>
                                        </div>
                                    }
                                    containerProps={{
                                        className: "-mt-5",
                                    }}
                                />
                            )) :
                            undefined
                    }
                </div>
                <div>
                    {
                        roles.length !== 0 ?
                            roles.slice(2, 4).map(role => (
                                <Checkbox
                                    key={role.id}
                                    checked={selectedRoleIds.includes(role.id)}
                                    onChange={() => handleCheckboxChange(role.id)}
                                    label={
                                        <div className="mb-2">
                                            <Typography color="blue-gray" className="font-medium">
                                                {role.roleName}
                                            </Typography>
                                            <Typography variant="small" color="gray" className="font-normal">
                                                {role.description}
                                            </Typography>
                                        </div>
                                    }
                                    containerProps={{
                                        className: "-mt-5",
                                    }}
                                />
                            )) :
                            'Loading roles..'
                    }
                </div>
            </div>
        </div>
    );
}

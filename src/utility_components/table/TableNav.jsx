import {
    CardHeader,
    Tab, Tabs,
    TabsHeader, Typography
} from '@material-tailwind/react';
import React, { useState } from 'react';
import TableSearchBar from './TableSearchBar';

const TABS = [
    {
        label: "Active",
        value: "",
    },
    {
        label: "Trashed",
        value: "trash",
    },
];

const TableNav = ({ total, configMethods, title = "Inventory", isAllow }) => {
    const [tabMessage, setTabMessage] = useState("");

    const handleTabQuery = (tab) => {
        const message = tab === "trash" ? "Will be deleted within 30 days" : "";
        setTabMessage(message);
        configMethods.handleTab(`trash=${tab}&`, message);
    }

    return (
        <CardHeader floated={false} shadow={false} className="rounded-none">
            <div className="mb-5 flex items-center justify-between gap-8">
                <div>
                    <Typography variant="h3" color="blue-gray">
                        {title} list
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                        See information about {tabMessage ? 'all ' : 'all active '}{title.toLowerCase()} ({total} total){tabMessage && ` - ${tabMessage}`}
                    </Typography>
                </div>
                {isAllow ? <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                    {configMethods.add()}
                </div> : undefined}
            </div>
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                <Tabs value="" className="w-full md:w-max">
                    <TabsHeader>
                        {TABS.map(({ label, value }) => (
                            <Tab key={value} value={value} onClick={() => handleTabQuery(value)}>
                                &nbsp;&nbsp;{label}&nbsp;&nbsp;
                            </Tab>
                        ))}
                    </TabsHeader>
                </Tabs>
                <TableSearchBar configMethods={configMethods} label={'Find ' + title.toLowerCase()} />
            </div>
        </CardHeader>
    )
}

export default TableNav;

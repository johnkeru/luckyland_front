import { Chip, ListItem, ListItemPrefix, ListItemSuffix } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import axiosCall from '../utility_functions/axiosCall';

const DashboardNavLink = ({ Icon, title = 'Title', endpoint }) => {
    const [notif, setNotif] = useState(0);

    useEffect(() => {
        if (endpoint) {
            axiosCall({ endpoint, setResponse: setNotif })
        }
    }, []);
    return (
        <ListItem>
            <ListItemPrefix>
                {Icon}
            </ListItemPrefix>
            {title}
            {/* {notif?.unread ? <ListItemSuffix>
                <Chip
                    value={notif.unread > 9 ? '9+' : notif.unread}
                    size="sm"
                    color="red"
                    className="rounded-full"
                />
            </ListItemSuffix> : undefined} */}
        </ListItem>
    )
}

export default DashboardNavLink
import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export function TablePagination({ loading, data, configMethods }) {

    const renderSelectPage = () => {
        const loadingPreview = [
            {
                active: false,
                label: 'Previous',
                url: null
            },
            {
                active: false,
                label: 1,
                url: null
            },
            {
                active: false,
                label: 2,
                url: null
            },
            {
                active: false,
                label: 3,
                url: null
            },
            {
                active: false,
                label: 4,
                url: null
            }, {
                active: false,
                label: 'Next',
                url: null
            },
        ]
        const render = loading ? loadingPreview : data.data.links
        return (
            <div className="flex items-center gap-4">
                <Button
                    variant="text"
                    className="flex items-center gap-2"
                    disabled={!render[0].url}
                    onClick={() => configMethods.handleSelectPage(parseInt(render[0]?.url.slice(-1)))}
                >
                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
                </Button>

                {
                    render.slice(1, render.length - 1).map(link => (
                        <IconButton
                            key={link.label}
                            variant={link.active ? "filled" : "text"}
                            onClick={() => configMethods.handleSelectPage(parseInt(link.label))}>
                            {link.label}
                        </IconButton>
                    ))
                }
                <Button
                    variant="text"
                    className="flex items-center gap-2"
                    disabled={!render[render.length - 1].url}
                    onClick={() => configMethods.handleSelectPage(parseInt(render[render.length - 1]?.url.slice(-1)))}
                >
                    Next
                    <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                </Button>
            </div>
        )
    }


    return (
        <>
            {renderSelectPage()}
        </>
    );
}
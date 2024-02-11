import React, { cloneElement, useState, } from 'react'
import Button from '../Button';

const RefModal = ({ button, data, onClick }) => {
    const [loading, setLoading] = useState(false);

    const handleOpen = () => {
        document.getElementById('my_modal_' + data.id).showModal()
    }
    const handleClose = () => {
        document.getElementById('my_modal_' + data.id).close();
    };

    const handleSubmit = () => {
        onClick(data.id, setLoading, handleClose);
    }

    return (
        <>
            {cloneElement(button, { onClick: handleOpen })}
            <dialog id={"my_modal_" + data.id} className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" disabled={loading}>✕</button>
                    </form>
                    <div className="bg-white rounded-lg mx-2">
                        <h2 className="text-xl font-semibold mb-4">Are you sure you want to delete {data.productName}?</h2>
                        <p className="text-gray-700 mb-4">This action cannot be undone.</p>
                        <div className="flex justify-end gap-2">
                            <Button onClick={handleSubmit} loading={loading}>Delete</Button>
                            <Button disabled={loading} secondary onClick={() => {
                                handleClose()
                            }}>Cancel</Button>
                        </div>
                    </div>
                </div>
            </dialog >
        </>
    )
}

export default RefModal
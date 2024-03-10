import React from 'react';

const Test = () => {
    const data = [
        { name: 'Product 1', quantity: 10, status: 'In Stock', price: '$20', description: 'Description for Product 1' },
        {
            name: 'Product 2', quantity: 5, status: 'Out of Stock', price: '$15', description: 'Description for Product 2', subTable: [
                {
                    status: 'In Stock',
                    description: 'Description for sub 1'
                },
                {
                    status: 'Out of Stock',
                    description: 'Description for sub 2'
                },
            ]
        },
        { name: 'Product 3', quantity: 15, status: 'In Stock', price: '$25', description: 'Description for Product 3' },
        { name: 'Product 4', quantity: 3, status: 'In Stock', price: '$30', description: 'Description for Product 4' },
        { name: 'Product 5', quantity: 8, status: 'Out of Stock', price: '$10', description: 'Description for Product 5' }
    ];

    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Status</th>
                    <th>Price</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    item.subTable ? <>
                        <tr key={index}>
                            <td style={{ border: '1px solid brown' }}>{item.name}</td>
                            <td style={{ border: '1px solid brown' }}>{item.quantity}</td>
                            <td style={{ border: '1px solid brown' }}>{item.status}</td>
                            <td style={{ border: '1px solid brown' }}>{item.price}</td>
                            <td style={{ border: '1px solid brown' }}>{item.description}</td>
                        </tr>
                        {item.subTable && item.subTable.map((sub, i) => (
                            <tr key={`${index}-${i}`}>
                                <td></td>
                                <td></td>
                                <td style={{ border: '1px solid brown' }}>{sub.status}</td>
                                <td></td>
                                <td style={{ border: '1px solid brown' }}>{sub.description}</td>
                            </tr>
                        ))}


                    </> :
                        <tr key={index}>
                            <td style={{ border: '1px solid brown' }}>{item.name}</td>
                            <td style={{ border: '1px solid brown' }}>{item.quantity}</td>
                            <td style={{ border: '1px solid brown' }}>{item.status}</td>
                            <td style={{ border: '1px solid brown' }}>{item.price}</td>
                            <td style={{ border: '1px solid brown' }}>{item.description}</td>
                        </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Test;

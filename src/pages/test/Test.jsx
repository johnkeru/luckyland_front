import React from 'react'
import DynamicForm from '../../utility_components/DynamicForm'

const Test = () => {
    return (
        <DynamicForm
            fields={[
                { name: 'name', type: 'string', },
                { name: 'nickname', type: 'string', optional: true }
            ]}
            handleSubmit={val => console.log(val)}
        />
    )
}

export default Test
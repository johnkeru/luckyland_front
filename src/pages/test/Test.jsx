// src/TodoList.js
import React, { useState, useEffect } from 'react';
import './Carousel.css';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (savedTasks) {
            setTasks(savedTasks);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, { text: newTask, completed: false }]);
            setNewTask('');
        }
    };

    const toggleTaskCompletion = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? ({ ...task, completed: !task.completed }) : task
        );
        setTasks(updatedTasks);
    };

    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    return (
        <div className="todo-list">
            <h1>To-Do List</h1>
            <div>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task..."
                />
                <button onClick={addTask}>Add Task</button>
            </div>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index} className={task.completed ? 'completed' : ''}>
                        <span onClick={() => toggleTaskCompletion(index)}>{task.text}</span>
                        <button onClick={() => deleteTask(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;


// import { useCallback } from "react";


// const Test = () => {
//     const enhanceHandleClick = () => useCallback(() => console.log('fuck'), []);
//     return <div>
//         <button onClick={enhanceHandleClick(x)}>click haha</button>
//     </div>
// }

// export default Test;




// import { useMemo, useState } from "react";

// const url = 'https://fakestoreapi.com/products';

// const withDataFetching = (Component) => {
//     const EnhancedComponent = () => {
//         const [products, setProducts] = useState([]);
//         const [loading, setLoading] = useState(false);

//         useMemo(() => {
//             const fetchProducts = async () => {
//                 setLoading(true);
//                 try {
//                     const response = await fetch(url);
//                     const data = await response.json();
//                     setProducts(data);
//                 } catch (error) {
//                     console.error("Error fetching products:", error);
//                 } finally {
//                     setLoading(false);
//                 }
//             };

//             fetchProducts();
//         }, [url]);

//         return <Component loading={loading} products={products} />;
//     };

//     return EnhancedComponent;
// };

// const ProductsComponent = (props) => {
//     console.log(props.products);
//     return <div>List of products hehe</div>;
// };

// export default withDataFetching(ProductsComponent);








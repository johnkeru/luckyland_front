import React, { useEffect, useRef, useState } from 'react'
import { AiFillCaretLeft, AiOutlineCaretDown } from 'react-icons/ai'

const Accordion = () => {
    const lists = [
        {
            label: 'Label 1',
            content: '🤔 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates consectetur doloremque, nulla cumque sed accusamus aspernatur hic, incidunt numquam qui aperiam id ab. At, repudiandae quidem provident ipsum ipsam laborum.'
        },
        {
            label: 'Label 2',
            content: '🚀 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates consectetur doloremque, nulla cumque sed accusamus aspernatur hic, incidunt numquam qui aperiam id ab. At, repudiandae quidem provident ipsum ipsam laborum.'
        },
        {
            label: 'Label 3',
            content: '🙋 Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates consectetur doloremque, nulla cumque sed accusamus aspernatur hic, incidunt numquam qui aperiam id ab. At, repudiandae quidem provident ipsum ipsam laborum.'
        },
    ]
    const [currentIndex, setCurrentIndex] = useState(-1);

    const contentDiv =
        lists.map((d, index) => {

            const isActive = index === currentIndex;

            const toggleTab = (i) => {
                setCurrentIndex(upToDateIndex => {
                    return i === upToDateIndex ? - 1 : i
                });
            }

            const icon = isActive ? <AiOutlineCaretDown /> : <AiFillCaretLeft />

            return <div key={index}>
                <div onClick={() => toggleTab(index)} className='flex items-center justify-between border-2 bg-gray-100 hover:bg-gray-50 pl-2 text-xl cursor-pointer'>
                    <h2>{d.label}</h2>
                    {icon}
                </div>
                {isActive && <p>{d.content}</p>}
            </div>
        })



    const divRef = useRef();
    const handleEvent = (e) => {
        if (!divRef.current.contains(e.target)) {
            setCurrentIndex(-1)
        }
    }
    useEffect(() => {
        document.addEventListener('click', handleEvent, true);
        return () => document.removeEventListener('click', handleEvent, true)
    }, [])
    // Render all accordion elements within a container.
    return (
        <div className='w-1/3 m-auto dang' ref={divRef}>
            {contentDiv}
        </div>
    )
}

export default Accordion
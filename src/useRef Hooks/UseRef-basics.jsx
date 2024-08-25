/* eslint-disable no-unused-vars */
import React, { useRef, useState } from 'react'

export default function UseRefBasics() {
    const [response, setResponse] = useState([]);
    const [show, setShow] = useState('');

    const refContainer = useRef(null);
    const refShow = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            if (refContainer.current && refContainer.current.value) {
                const result = { id: new Date().getTime().toString(), value: refContainer.current.value };
                setResponse((prevResponse) => [...prevResponse, result]);
                refContainer.current.value = '';
            }
        } catch (err) {
            console.error('Error handling submit:', err);
        }
    }

    const handleShow = (e) => {
        e.preventDefault();
        try {
            console.log(refShow.current);
            const result = refShow.current ? refShow.current.outerHTML : '';
            setShow(result);
        } catch (err) {
            console.error('Error handling show:', err);
        }
    }

    const handleClearItem = (id) => {
        setResponse((prevResponse) => prevResponse.filter(item => item.id !== id));
    }

    const handleClearAll = () => {
        setResponse([]);
    }

    return (
        <article className='flex justify-center flex-col items-center gap-6'>
            <h1 className='font-bold text-2xl'>useRef Form</h1>
            <form onSubmit={handleSubmit}>
                <div className='flex shadow-md'>
                    <input type="text" ref={refContainer} className="px-7 py-3 rounded-l-md" />
                    <button type='submit' className='bg-blue-500 p-3 rounded-r-md text-white font-semibold'>Submit</button>
                </div>
            </form>
            {response.length > 0 && (
                <div className='max-w-[60rem] mx-auto overflow-x-auto'>
                    <div className='grid grid-cols-3 gap-4'>
                        {response.map(item => (
                            <div key={item.id} className='flex items-center justify-between px-4 py-3 bg-gray-100 rounded-md shadow-sm font-medium'>
                                <span className='flex-1 truncate'>{item.value}</span>
                                <button onClick={() => handleClearItem(item.id)} className='text-red-500 pl-6 text-sm'>Clear</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {show && (
                <pre className='w-[60rem] px-7 py-3 bg-gray-100 rounded-md shadow-sm text-center font-medium overflow-x-auto whitespace-pre-wrap'>
                    {show}
                </pre>
            )}
            <div className='flex gap-6'>
                <button type='button' ref={refShow} onClick={handleShow} className='bg-blue-500 px-10 py-3 rounded-md text-white font-semibold mt-4 hover:bg-blue-600 transition-colors'>Show Container</button>
                {response.length > 0 && (
                    <button onClick={handleClearAll} className='bg-blue-500 px-10 py-3 rounded-md text-white font-semibold mt-4 hover:bg-blue-600 transition-colors'>Clear All</button>
                )}
            </div>
        </article>
    )
}

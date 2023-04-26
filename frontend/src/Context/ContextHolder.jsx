import React, { createContext, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const MainContext = createContext();
export default function ContextHolder(props) {
    const [loader, setLoader] = useState(false);
    const notify = (msg, type) => {
        if (type == true) {
            toast.success(msg)
        } else {
            toast.error(msg)
        }
    };

    const toggleLoader = (type) => setLoader(type);
    return (
        <MainContext.Provider value={{ notify, toggleLoader }}>
            <div className='loader' style={{
                display: loader == true ? 'flex' : 'none'
            }}>
                <div></div>
            </div>
            <ToastContainer />
            {props.children}
        </MainContext.Provider>
    );
}
export { MainContext };
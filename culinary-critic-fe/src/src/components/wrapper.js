import {ToastContainer} from "react-toastify";
import './wrapper.css'

function Wrapper({ children }) {
    return (
        <div className='wrapper'>
            {children}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                icon={true}
                theme="light"
                max={3}
            />
        </div>
    )
}

export default Wrapper
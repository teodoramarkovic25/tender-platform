import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function errorMess() {
    toast.error('You have not successfully created a tender!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,

        style: {
            background: 'red',
        },
        bodyClassName: 'toast-body',
    });
};


export default function ErrorCreateTenderMessage() {
    return (
        <div>

        </div>
    );
}

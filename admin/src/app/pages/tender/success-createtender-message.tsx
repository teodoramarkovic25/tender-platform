import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function success() {
    toast.success('You have successfully created a tender!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,

        style: {
            background: 'green',
        },
        bodyClassName: 'toast-body',
})
};

export default function SuccessCreateTenderMessage() {
    return (
        <div>

        </div>
    );
}

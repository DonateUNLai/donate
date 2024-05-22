import { ToastOptions, toast } from 'react-toastify'

const configure = (duration?: number | null): ToastOptions => ({
    position: 'top-center',
    autoClose: duration ?? 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
})

export const message = {
    success(msg: string, duration?: number | null) {
        toast.success(msg, configure(duration))
    },
    error(msg: string, duration?: number | null) {
        toast.error(msg, configure(duration))
    },
    info(msg: string, duration?: number | null) {
        toast.info(msg, configure(duration))
    },
    warning(msg: string, duration?: number | null) {
        toast.warn(msg, configure(duration))
    },
    loading(msg: string, duration?: number | null) {
        toast.info(msg, configure(duration))
    }
}

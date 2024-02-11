import React from 'react'
import classNames from 'classnames'
import { twMerge } from 'tailwind-merge'
import { AiOutlineLoading } from "react-icons/ai";

const Button = ({
    primary,
    secondary,
    info,
    success,
    warning,
    error,
    outline,
    children,
    active,
    loading,
    ...rest
}) => {

    const styles = twMerge(
        classNames(rest.className, 'btn-sm btn', {
            'btn-primary': primary,
            'btn-secondary': secondary,
            'btn-info': info,
            'btn-success': success,
            'btn-warning': warning,
            'btn-error': error,
            'btn-outline': outline,
            'btn-disabled': rest.disabled,
            'border-gray-500 border-2': active
        }),
        // Exclude hover effects by removing any classes starting with 'hover:'
        rest.className ? rest.className.replace(/\bhover:\S+/g, '') : ''
    );


    return (
        <button {...rest} className={styles}>
            {loading ? <div className="animate-spin text-xl">
                <AiOutlineLoading />
            </div> : children}
        </button>
    )
}

export default Button

Button.propTypes = {
    checkVariationValue: ({ primary, secondary, success, warning, error }) => {
        const count = Number(!!primary) +
            Number(!!secondary) +
            Number(!!success) +
            Number(!!warning) +
            Number(!!error);
        if (count > 1) {
            return new Error('Only one variant should be selected (primary, secondary, success, warning, or error). Please choose only one variant.');
        }
    }
}


// < Button className = 'border-1' prefix = 'loading' > <div className="animate-spin text-sm">
//     <AiOutlineLoading />
// </div></Button >
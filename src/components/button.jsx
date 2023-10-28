import React from 'react';

const Button = (props) => {

    const { children, ...rest } = props
    return (
        <button {...rest} className={props.className}>
            {children}
        </button>
    );
}

export default Button;

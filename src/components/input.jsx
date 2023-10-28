import React from 'react';

const Input = (props) => {
    const { ...rest } = props
    return (
        <>
            <input className={props.class}  {...rest} />
        </>
    );
}

export default Input;

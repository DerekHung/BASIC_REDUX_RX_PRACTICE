import React from 'react';
import PropTypes from 'prop-types';

const Input = (props) => {
    return(
        <input
            placeholder={props.placeHolder}
            className={props.className} 
            onChange={props.onChange}
            onKeyUp={props.onKeyUp}
        />
    );
}
Input.propTypes = {
    placeHolder: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    onKeyUp: PropTypes.func,
}

export default Input;
import React from 'react';

const Input = ({ label, helpText = "", value, onChange, readonly = false }) => {
    const id = label.toLowerCase() + (readonly ? "Readonly" : "");

    const input = readonly ?
        <input readOnly type="text" className="form-control" id={id} value={value !== null ? value : ""} />
        : <input type="text" className="form-control" id={id} value={value} onChange={onChange} />;

    return (
        <div className="form-group">
            <label htmlFor={id}>{label}</label>
            {input}
            <small className="form-text text-muted">{helpText}</small>
        </div>
    );
}

export default Input;

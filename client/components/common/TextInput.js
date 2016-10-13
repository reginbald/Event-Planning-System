import React, { PropTypes } from 'react';

const TextInput = ({name, label, onChange, placeholder, value}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <input
        type="text"
        name={name}
        value={value}
        className="from-control"
        placeholder={placeholder}
        onChange={onChange}/>
      </div>
    </div>
  );
};

export default TextInput;

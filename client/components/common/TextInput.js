import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';

const TextInput = ({name, label,type, onChange, placeholder, value}) => {
  return (
    <div>
      <TextField
        type={type}
        name={name}
        hintText={placeholder}
        floatingLabelText={label}
        onChange={onChange}
      />
    </div>
  );
};

export default TextInput;

import React, { PropTypes } from 'react';
import TextField from 'material-ui/TextField';

const TextInput = ({name, label, onChange, placeholder, value}) => {
  return (
    <div>
      <TextField
        hintText="Vlad ;)"
        floatingLabelText={label}
      />
    </div>
  );
};

export default TextInput;

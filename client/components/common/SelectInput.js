import React, { PropTypes } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const SelectInput = ({value, options, onChange, hintText}) => {
  return (
    <div>
    <SelectField value={value} onChange={onChange} hintText={hintText}>
      {options.map((item) => {
        return <MenuItem key={item.id} value={item.id} primaryText={item.name} />;
      })}
     </SelectField>
    </div>
  );
};

export default SelectInput;

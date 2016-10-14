import React, { PropTypes } from 'react';
import RaisedButton from 'material-ui/RaisedButton';

const SubmitButton = ({label, onLogin}) => {
  return (
    <div>
      <RaisedButton
      label={label}
      primary={true}
      onTouchTap={onLogin} />
    </div>
  );
};

export default SubmitButton;

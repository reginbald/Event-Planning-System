import React, { PropTypes } from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
  margin: 12,
};

const CreateButton = ({label, handleOpen}) => {
  return (
    <div>
      <RaisedButton
      label={label}
      secondary={true}
      style={style}
      ontTouchTap={handleOpen} />
    </div>
  );
};

export default CreateButton;

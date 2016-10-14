import React from 'react';
import RaisedButton from 'material-ui/RaisedButton'

const style = {
  margin: 14
};

const CreateButton = ({label, onTouchTap, secondary}) => {
  return (
    <div>
      <RaisedButton
      label={label}
      onTouchTap={onTouchTap}
      secondary={secondary}
      style={style}/>
    </div>
  );
}

export default CreateButton;

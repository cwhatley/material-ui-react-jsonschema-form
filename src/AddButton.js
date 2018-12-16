import React from "react";
import { Button, Icon } from "@material-ui/core";

function _AddButton(props) {
  const { icon, className, ...otherProps } = props;
  return (
    <Button {...otherProps} variant="contained" color="secondary" size="small">
      <Icon>{icon}</Icon>
    </Button>
  );
}

export default function AddButton({ className, onClick, disabled }) {
  return (
    <_AddButton
      type="info"
      icon="add"
      className="btn-add col-xs-12"
      tabIndex="0"
      onClick={onClick}
      disabled={disabled}
    />
  );
}

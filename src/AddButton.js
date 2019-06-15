import React from "react";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";

function _AddButton(props) {
  const { icon, className, ...otherProps } = props;
  return (
    <Button
      {...otherProps}
      variant="outlined"
      color="secondary"
      size="small"
      style={{ margin: "16px" }}>
      <Icon>{icon}</Icon> Add Item
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

import React from "react";
import { Button, Icon } from "@material-ui/core";

let mappings = {
  remove: "delete",
  plus: "add",
  "arrow-up": "arrow_upward",
  "arrow-down": "arrow_downward",
};

export default function _IconButton(props) {
  // was type = "default" in props
  const { icon, className, ...otherProps } = props;
  return (
    <Button {...otherProps} size="small">
      <Icon>{mappings[icon] || icon}</Icon>
    </Button>
  );
}

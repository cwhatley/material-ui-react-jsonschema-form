import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@material-ui/core";

const REQUIRED_FIELD_SYMBOL = "*";

function TitleField(props) {
  const { id, title, required } = props;
  return (
    <Typography id={id} variant="h6" gutterBottom>
      {title}
      {required && <span className="required">{REQUIRED_FIELD_SYMBOL}</span>}
    </Typography>
  );
}

if (process.env.NODE_ENV !== "production") {
  TitleField.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    required: PropTypes.bool,
  };
}

export default TitleField;

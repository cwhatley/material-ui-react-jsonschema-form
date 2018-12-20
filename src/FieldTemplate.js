import { ADDITIONAL_PROPERTY_FLAG } from "react-jsonschema-form/lib/utils";
import React from "react";
import { TextField, FormLabel, Typography } from "@material-ui/core";

export default function DefaultTemplate(props) {
  const {
    id,
    label,
    children,
    description,
    hidden,
    required,
    displayLabel,
    onKeyChange,
    schema,
  } = props;
  if (hidden) {
    return children;
  }

  function under_text(frag) {
    return (
      <Typography
        variant="caption"
        color="textSecondary"
        style={{ paddingLeft: "16px" }}>
        {frag}
      </Typography>
    );
  }

  const additional = schema.hasOwnProperty(ADDITIONAL_PROPERTY_FLAG);
  const keyLabel = `${label} Key`;

  function inner() {
    return (
      <React.Fragment>
        {additional && (
          <React.Fragment>
            <FormLabel required={required} id={`${id}-key`}>
              {keyLabel}
            </FormLabel>
            <TextField
              required={required}
              id={`${id}-key`}
              onChange={onKeyChange}
            />
          </React.Fragment>
        )}
        {children}
        {displayLabel && description ? under_text(description) : null}
      </React.Fragment>
    );
  }

  return inner();
}

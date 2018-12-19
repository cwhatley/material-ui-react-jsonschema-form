import { ADDITIONAL_PROPERTY_FLAG } from "react-jsonschema-form/lib/utils";
import React from "react";
import {
  TextField,
  FormLabel,
  Typography,
  FormHelperText,
} from "@material-ui/core";

export default function DefaultTemplate(props) {
  const {
    id,
    label,
    children,
    rawErrors,
    help,
    description,
    hidden,
    required,
    displayLabel,
    onKeyChange,
    schema,
    uiSchema,
  } = props;
  if (hidden) {
    return children;
  }

  let help_text = uiSchema["ui:help"];
  let help_is_object = typeof help_text == "object";
  let actual_help = help;
  //console.log('help_text', typeof help_text, help_text)
  if (help_text && !help_is_object) {
    //console.log('replacing help', help_text);
    actual_help = (
      <Typography variant="caption" color="textSecondary">
        {help_text}
      </Typography>
    );
  } else if (help_is_object) {
    actual_help = "";
  }

  const additional = schema.hasOwnProperty(ADDITIONAL_PROPERTY_FLAG);
  const keyLabel = `${label} Key`;
  //console.log('schema', schema);
  //console.log('uiSchema', uiSchema);

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
        {displayLabel && description ? description : null}
        {rawErrors &&
          rawErrors.map(e => <FormHelperText error={true}>{e}</FormHelperText>)}
        {actual_help}
      </React.Fragment>
    );
  }

  return inner();
}

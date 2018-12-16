import { ADDITIONAL_PROPERTY_FLAG } from "react-jsonschema-form/lib/utils";
import React from "react";
import {
  TextField,
  FormControl,
  FormLabel,
  Typography,
  FormHelperText,
} from "@material-ui/core";

export default function DefaultTemplate(props) {
  const {
    id,
    classNames,
    label,
    children,
    rawErrors,
    help,
    description,
    hidden,
    required,
    displayLabel,
    onKeyChange,
    //schema,
    uiSchema,
  } = props;
  if (hidden) {
    return children;
  }

  function suppress_label() {
    let l = uiSchema["ui:widget"];
    let map = {
      textarea: true,
      checkboxes: true,
      range: true,
    };
    console.log("mapped", map[l]);
    return !map[l];
  }

  let help_text = uiSchema["ui:help"];
  let help_is_object = typeof help_text == "object";
  let actual_help = help;
  //console.log('help_text', typeof help_text, help_text)
  if (help_text && !help_is_object) {
    //console.log('replacing help', help_text);
    actual_help = <Typography variant="caption">{help_text}</Typography>;
  } else if (help_is_object) {
    actual_help = "";
  }

  const additional = props.schema.hasOwnProperty(ADDITIONAL_PROPERTY_FLAG);
  const keyLabel = `${label} Key`;
  const forceLabelHide = suppress_label();
  //console.log('schema', schema);
  //console.log('schema', uiSchema);
  //console.log('hiding label', forceLabelHide);
  return (
    <div className={classNames}>
      {additional && (
        <React.Fragment>
          <FormLabel required={required} id={`${id}-key`}>
            {keyLabel}xX
          </FormLabel>
          <TextField
            required={required}
            id={`${id}-key`}
            onChange={onKeyChange}
          />
        </React.Fragment>
      )}
      <FormControl fullWidth={true} margin="normal" error={!!rawErrors}>
        {!forceLabelHide && displayLabel && (
          <FormLabel required={required} id={`${id}-key`}>
            {label}
          </FormLabel>
        )}
        {children}
        {displayLabel && description ? description : null}
        {rawErrors &&
          rawErrors.map(e => <FormHelperText error={true}>{e}</FormHelperText>)}
        {actual_help}
      </FormControl>
    </div>
  );
}

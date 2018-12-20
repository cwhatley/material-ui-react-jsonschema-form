import React from "react";
import PropTypes from "prop-types";
import {
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormHelperText,
} from "@material-ui/core";

function RadioWidget(props) {
  const {
    id,
    schema,
    options,
    value,
    required,
    disabled,
    readonly,
    autofocus,
    rawErrors,
    classNames,
    label,
    onChange,
  } = props;
  // Generating a unique field name to identify this set of radio buttons
  const name = Math.random().toString();
  const { enumOptions, enumDisabled } = options;
  const _onChange = (ev, value) =>
    onChange(schema.type == "boolean" ? value !== "false" : value);
  // checked={checked} has been moved above name={name}, As mentioned in #349;
  // this is a temporary fix for radio button rendering bug in React, facebook/react#7630.
  return (
    <FormControl
      variant="outlined"
      margin="dense"
      fullWidth={true}
      margin="normal"
      error={rawErrors && rawErrors.length}
      required={required}
      className={`rjsf-radio ` + classNames}
      style={{ paddingLeft: "16px" }}>
      <FormLabel htmlFor={id}>{label || schema.title}</FormLabel>
      <RadioGroup
        name={name}
        className="field-radio-group"
        value={`${value}`}
        onChange={_onChange}
        required={required}>
        {enumOptions.map((option, i) => {
          const itemDisabled =
            enumDisabled && enumDisabled.indexOf(option.value) != -1;
          const radio = (
            <FormControlLabel
              control={<Radio color="primary" key={i} />}
              label={`${option.label}`}
              value={`${option.value}`}
              key={i}
              disabled={disabled || itemDisabled || readonly}
              autoFocus={autofocus && i === 0}
            />
          );
          return radio;
        })}
      </RadioGroup>
      {rawErrors &&
        rawErrors.map((e, i) => <FormHelperText key={i}>{e}</FormHelperText>)}
    </FormControl>
  );
}

RadioWidget.defaultProps = {
  autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
  RadioWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    options: PropTypes.shape({
      enumOptions: PropTypes.array,
      inline: PropTypes.bool,
    }).isRequired,
    value: PropTypes.any,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
  };
}
export default RadioWidget;

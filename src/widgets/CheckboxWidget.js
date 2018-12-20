import React from "react";
import PropTypes from "prop-types";
import DescriptionField from "../fields/DescriptionField.js";
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Checkbox,
} from "@material-ui/core";

function CheckboxWidget(props) {
  const {
    schema,
    id,
    value,
    required,
    disabled,
    readonly,
    label,
    rawErrors,
    autofocus,
    onChange,
  } = props;

  return (
    <FormControl error={!!rawErrors}>
      {schema.description && (
        <DescriptionField description={schema.description} />
      )}
      <FormControlLabel
        control={
          <Checkbox
            type="checkbox"
            id={id}
            checked={typeof value === "undefined" ? false : value}
            required={required}
            disabled={disabled || readonly}
            autoFocus={autofocus}
            onChange={event => onChange(event.target.checked)}
          />
        }
        label={label}
      />
      {rawErrors &&
        rawErrors.map((e, i) => <FormHelperText key={i}>{e}</FormHelperText>)}
    </FormControl>
  );
}

CheckboxWidget.defaultProps = {
  autofocus: false,
};

if (process.env.NODE_ENV !== "production") {
  CheckboxWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.bool,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
  };
}

export default CheckboxWidget;

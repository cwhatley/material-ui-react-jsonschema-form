import React from "react";
import PropTypes from "prop-types";
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormHelperText,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

function selectValue(value, selected, all) {
  const at = all.indexOf(value);
  const updated = selected.slice(0, at).concat(value, selected.slice(at));
  // As inserting values at predefined index positions doesn't work with empty
  // arrays, we need to reorder the updated selection to match the initial order
  return updated.sort((a, b) => all.indexOf(a) > all.indexOf(b));
}

function deselectValue(value, selected) {
  return selected.filter(v => v !== value);
}

function CheckboxesWidget(props) {
  const {
    schema,
    label,
    id,
    disabled,
    options,
    value,
    autofocus,
    readonly,
    onChange,
    rawErrors,
    required,
    classNames,
  } = props;
  const { enumOptions, enumDisabled, inline } = options;
  return (
    <FormControl
      margin="dense"
      fullWidth={true}
      margin="normal"
      error={!!rawErrors}
      required={required}
      className={`rjsf-checkboxes ` + classNames}>
      <FormLabel htmlFor={id}>{label || schema.title}</FormLabel>
      <FormGroup>
        {enumOptions.map((option, index) => {
          const checked = value.indexOf(option.value) !== -1;
          const itemDisabled =
            enumDisabled && enumDisabled.indexOf(option.value) != -1;
          const checkbox = (
            <Checkbox
              type="checkbox"
              id={`${id}_${index}`}
              checked={checked}
              disabled={disabled || itemDisabled || readonly}
              autoFocus={autofocus && index === 0}
              onChange={event => {
                const all = enumOptions.map(({ value }) => value);
                if (event.target.checked) {
                  onChange(selectValue(option.value, value, all));
                } else {
                  onChange(deselectValue(option.value, value));
                }
              }}
            />
          );
          return inline ? (
            <FormControlLabel
              control={checkbox}
              key={index}
              label={option.label}
            />
          ) : (
            <FormControlLabel
              control={checkbox}
              key={index}
              label={option.label}
            />
          );
        })}
      </FormGroup>
      {rawErrors &&
        rawErrors.map((e, i) => <FormHelperText key={i}>{e}</FormHelperText>)}
    </FormControl>
  );
}

CheckboxesWidget.defaultProps = {
  autofocus: false,
  options: {
    inline: false,
  },
};

if (process.env.NODE_ENV !== "production") {
  CheckboxesWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    options: PropTypes.shape({
      enumOptions: PropTypes.array,
      inline: PropTypes.bool,
    }).isRequired,
    value: PropTypes.any,
    required: PropTypes.bool,
    readonly: PropTypes.bool,
    disabled: PropTypes.bool,
    multiple: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
  };
}

export default CheckboxesWidget;

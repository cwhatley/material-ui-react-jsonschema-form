import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import {
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";

const classes = PropTypes.object.isRequired;

import { asNumber /*, guessType */ } from "react-jsonschema-form/lib/utils";

const nums = new Set(["number", "integer"]);

// TODO - delete after solving problem importing guessType from base lib
function guessType(value) {
  if (Array.isArray(value)) {
    return "array";
  } else if (typeof value === "string") {
    return "string";
  } else if (value == null) {
    return "null";
  } else if (typeof value === "boolean") {
    return "boolean";
  } else if (!isNaN(value)) {
    return "number";
  } else if (typeof value === "object") {
    return "object";
  }
  // Default to string if we can't figure it out
  return "string";
}

/**
 * This is a silly limitation in the DOM where option change event values are
 * always retrieved as strings.
 */
function processValue(schema, value) {
  // "enum" is a reserved word, so only "type" and "items" can be destructured
  const { type, items } = schema;
  if (value === "") {
    return undefined;
  } else if (type === "array" && items && nums.has(items.type)) {
    return value.map(asNumber);
  } else if (type === "boolean") {
    return value === "true";
  } else if (type === "number") {
    return asNumber(value);
  }

  // If type is undefined, but an enum is present, try and infer the type from
  // the enum values
  if (schema.enum) {
    if (schema.enum.every(x => guessType(x) === "number")) {
      return asNumber(value);
    } else if (schema.enum.every(x => guessType(x) === "boolean")) {
      return value === "true";
    }
  }

  return value;
}

class SelectWidget extends React.Component {
  static defaultProps = {
    autofocus: false,
  };

  state = {
    labelWidth: 0,
  };

  componentDidMount() {
    this.setState({
      labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
    });
  }

  render() {
    const {
      schema,
      id,
      options,
      value,
      label,
      required,
      disabled,
      readonly,
      multiple,
      autofocus,
      onChange,
      onBlur,
      onFocus,
      rawErrors,
      classNames,
      placeholder,
    } = this.props;
    const { enumOptions, enumDisabled } = options;
    const emptyValue = multiple ? [] : "";
    return (
      <FormControl
        variant="outlined"
        margin="dense"
        fullWidth={true}
        margin="normal"
        error={!!rawErrors}
        required={required}
        className={`rjsf-select ` + classNames}>
        <InputLabel
          shrink
          htmlFor={id}
          ref={ref => {
            this.InputLabelRef = ref;
          }}>
          {label || schema.title}
        </InputLabel>
        <Select
          input={
            <OutlinedInput
              name={name}
              labelWidth={this.state.labelWidth}
              id={id}
              notched={true}
            />
          }
          variant="outlined"
          multiple={typeof multiple === "undefined" ? false : multiple}
          className={classes.selectEmpty}
          value={typeof value === "undefined" ? emptyValue : value}
          required={required}
          disabled={disabled || readonly}
          autoFocus={autofocus}
          onBlur={
            onBlur &&
            (event => {
              onBlur(id, processValue(schema, event.target.value));
            })
          }
          onFocus={
            onFocus &&
            (event => {
              onFocus(id, processValue(schema, event.target.value));
            })
          }
          onChange={event => {
            onChange(processValue(schema, event.target.value));
          }}>
          {!multiple && !schema.default && (
            <MenuItem value="">{placeholder ? placeholder : "Select"}</MenuItem>
          )}
          {enumOptions.map(({ value, label }, i) => {
            const disabled = enumDisabled && enumDisabled.indexOf(value) != -1;
            return (
              <MenuItem key={i} value={value} disabled={disabled}>
                {label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  SelectWidget.propTypes = {
    schema: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    options: PropTypes.shape({
      enumOptions: PropTypes.array,
    }).isRequired,
    value: PropTypes.any,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    readonly: PropTypes.bool,
    multiple: PropTypes.bool,
    autofocus: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
  };
}

export default SelectWidget;

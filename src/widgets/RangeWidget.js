import React from "react";
import PropTypes from "prop-types";
import Slider from "@material-ui/lab/Slider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";

import { rangeSpec } from "react-jsonschema-form/lib/utils";

function RangeWidget(props) {
  const {
    value,
    //readonly,
    //disabled,
    //autofocus,
    //onBlur,
    //onFocus,
    options,
    schema,
    //formContext,
    //registry,
    //rawErrors,
    label,
    id,
  } = props;

  let sliderProps = { value, label, id, ...rangeSpec(schema) };

  const _onChange = (ev, value) => {
    return props.onChange(value === "" ? options.emptyValue : value);
  };
  return (
    <Grid
      container
      spacing={16}
      style={{ padding: "16px" }}
      alignItems="flex-start">
      <Grid container>
        <Grid item xs={12} style={{ paddingLeft: "8px" }}>
          <InputLabel shrink htmlFor={id}>
            {label}
          </InputLabel>
        </Grid>
      </Grid>
      <Grid container alignItems="flex-end" style={{ padding: "16px" }}>
        <Grid item xs>
          <Slider {...sliderProps} onChange={_onChange} />
        </Grid>
        <Grid item>
          <Typography>{value}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

if (process.env.NODE_ENV !== "production") {
  RangeWidget.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };
}

export default RangeWidget;

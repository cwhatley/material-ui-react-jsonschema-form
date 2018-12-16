import React from "react";
import PropTypes from "prop-types";
import { Slider } from "@material-ui/lab";
import { Grid, Typography } from "@material-ui/core";

import { rangeSpec } from "react-jsonschema-form/lib/utils";

function RangeWidget(props) {
  const { schema, value } = props;

  return (
    <Grid container style={{ paddingTop: "12px" }}>
      <Grid item xs={11}>
        <Slider value={value} {...props} {...rangeSpec(schema)} />
      </Grid>
      <Grid item xs={1}>
        <Typography>{value}</Typography>
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

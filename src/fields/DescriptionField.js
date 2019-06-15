import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

function DescriptionField(props) {
  const { id, description } = props;
  if (!description) {
    // See #312: Ensure compatibility with old versions of React.
    return <div />;
  }
  if (typeof description === "string") {
    return (
      <Typography variant="caption" gutterBottom>
        {description}
      </Typography>
    );
  } else {
    return (
      <Typography variant="caption" id={id}>
        {description}XX
      </Typography>
    );
  }
}

if (process.env.NODE_ENV !== "production") {
  DescriptionField.propTypes = {
    id: PropTypes.string,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  };
}

export default DescriptionField;

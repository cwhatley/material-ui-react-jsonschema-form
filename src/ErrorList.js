import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  Icon,
  ListItemText,
  Paper,
} from "@material-ui/core";

export default function ErrorList(props) {
  const { errors, schema } = props;
  return (
    <Paper style={{ padding: "12px", margin: "12px" }}>
      <Typography variant="h6" component="h6">
        Form Errors
      </Typography>
      <List dense={true}>
        {errors.map((error, i) => {
          console.log("error", error, schema);
          return (
            <ListItem key={i}>
              <ListItemIcon>
                <Icon>error</Icon>
              </ListItemIcon>
              <ListItemText primary={error.stack} />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}

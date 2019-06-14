import React from "react";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Icon from "@material-ui/core/Icon";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";

export default function ErrorList(props) {
  const { errors } = props;
  return (
    <Paper style={{ padding: "12px", margin: "12px" }}>
      <Typography variant="h6" component="h6">
        Form Errors
      </Typography>
      <List dense={true}>
        {errors.map((error, i) => {
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

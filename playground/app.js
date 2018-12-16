import React, { Component } from "react";
import { render } from "react-dom";
//import classNames from 'classnames';
import { UnControlled as CodeMirror } from "react-codemirror2";
import "codemirror/mode/javascript/javascript";
import { withStyles, createStyles } from "@material-ui/core/styles";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  Toolbar,
  CssBaseline,
  Card,
  CardContent,
  Grid,
  AppBar,
  Typography,
  Drawer,
} from "@material-ui/core";
import { shouldRender } from "react-jsonschema-form/lib/utils";
import { samples } from "./samples";
import MuiForm from "../src/MuiForm";
import ErrorList from "../src/ErrorList";

import Button from "@material-ui/core/Button";

// Import a few CodeMirror themes; these are used to match alternative
// bootstrap ones.
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/blackboard.css";
import "codemirror/theme/mbo.css";
import "codemirror/theme/ttcn.css";
import "codemirror/theme/solarized.css";
import "codemirror/theme/monokai.css";
import "codemirror/theme/eclipse.css";

import red from "@material-ui/core/colors/red";

const uiTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      light: "#fffff",
      main: "#d1d1d1",
      dark: "#a0a0a0",
      contrastText: "#000",
    },
    secondary: {
      light: "#fff460",
      main: "#ffc229",
      dark: "#c79200",
      contrastText: "#000",
    },
    error: red,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  overrides: {
    MuiSelect: {
      root: {
        minWidth: "50px",
        display: "inline-block",
        position: "relative",
      },
    },
  },
});

const drawerWidth = 240;

const styles = theme =>
  createStyles({
    root: {
      display: "flex",
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
      ...theme.mixins.toolbar,
    },
    toolbarIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 36,
    },
    menuButtonHidden: {
      display: "none",
    },
    title: {
      flexGrow: 1,
      fontFamily: "PrimeLight",
      fontWeight: "bold",
      fontSize: "18px",
      letterSpacing: "18px",
      marginTop: ".25em",
      verticalAlign: "center",
    },
    "field-array": {
      padding: "32px",
    },
    drawer: {
      flexShrink: 0,
    },
    drawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing.unit * 7,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing.unit * 9,
      },
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing.unit * 3,
      height: "100vh",
      overflow: "auto",
    },
    chartContainer: {
      marginLeft: -22,
    },
    tableContainer: {
      height: 320,
    },
    logo: {
      maxHeight: "42px",
    },
  });

const log = type => console.log.bind(console, type);
const fromJson = json => JSON.parse(json);
const toJson = val => JSON.stringify(val, null, 2);
const liveSettingsSchema = {
  type: "object",
  properties: {
    validate: { type: "boolean", title: "Live validation" },
    disable: { type: "boolean", title: "Disable whole form" },
  },
};
const cmOptions = {
  theme: "default",
  height: "auto",
  viewportMargin: Infinity,
  mode: {
    name: "javascript",
    json: true,
    statementIndent: 2,
  },
  lineNumbers: true,
  lineWrapping: true,
  indentWithTabs: false,
  tabSize: 2,
};

class GeoPosition extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props.formData };
  }

  onChange(name) {
    return event => {
      this.setState({ [name]: parseFloat(event.target.value) });
      setImmediate(() => this.props.onChange(this.state));
    };
  }

  render() {
    const { lat, lon } = this.state;
    return (
      <div className="geo">
        <h3>Hey, I'm a custom component</h3>
        <p>
          I'm registered as <code>geo</code> and referenced in
          <code>uiSchema</code> as the <code>ui:field</code> to use for this
          schema.
        </p>
        <div className="row">
          <div className="col-sm-6">
            <label>Latitude</label>
            <input
              className="form-control"
              type="number"
              value={lat}
              step="0.00001"
              onChange={this.onChange("lat")}
            />
          </div>
          <div className="col-sm-6">
            <label>Longitude</label>
            <input
              className="form-control"
              type="number"
              value={lon}
              step="0.00001"
              onChange={this.onChange("lon")}
            />
          </div>
        </div>
      </div>
    );
  }
}

class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = { valid: true, code: props.code };
  }

  componentWillReceiveProps(props) {
    this.setState({ valid: true, code: props.code });
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shouldRender(this, nextProps, nextState);
  }

  onCodeChange = (editor, metadata, code) => {
    this.setState({ valid: true, code });
    setImmediate(() => {
      try {
        this.props.onChange(fromJson(this.state.code));
      } catch (err) {
        this.setState({ valid: false, code });
      }
    });
  };

  render() {
    let { title } = this.props;
    //const icon = this.state.valid ? "ok" : "remove";
    //const cls = this.state.valid ? "valid" : "invalid";
    return (
      <Card>
        <CardContent>
          <Typography variant="title" gutterBottom>
            {" " + title}
          </Typography>
          <CodeMirror
            value={this.state.code}
            onChange={this.onCodeChange}
            autoCursor={false}
            options={Object.assign({}, cmOptions, { theme: "solarized-dark" })}
          />
        </CardContent>
      </Card>
    );
  }
}

class Selector extends Component {
  constructor(props) {
    super(props);
    this.state = { current: "Simple" };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shouldRender(this, nextProps, nextState);
  }

  onLabelClick = label => {
    return event => {
      event.preventDefault();
      this.setState({ current: label });
      setImmediate(() => this.props.onSelected(samples[label]));
    };
  };

  render() {
    return (
      <List component="nav">
        {Object.keys(samples).map((label, i) => {
          return (
            <ListItem key={i}>
              <a href="#" onClick={this.onLabelClick(label)}>
                <ListItemText primary={label} />
              </a>
            </ListItem>
          );
        })}
      </List>
    );
  }
}
/*
function ThemeSelector({ theme, select }) {
    const themeSchema = {
        type: "string",
        enum: Object.keys(themes),
    };
    return (
        <MuiForm
            uiTheme={uiTheme}
            schema={themeSchema}
            uiTheme={uiTheme}
            formData={theme}
            onChange={({ formData }) => select(formData, themes[formData])}>
            <div />
        </MuiForm>
    );
}
*/
/*
class CopyLink extends Component {
    onCopyClick = event => {
        this.input.select();
        document.execCommand("copy");
    };

    render() {
        const { shareURL, onShare } = this.props;
        if (!shareURL) {
            return (
                <div>
                    <Button variant="contained" color="primary" onClick={onShare}>
                        Share
                    </Button>
                </div>
            );
        }
        return (
            <div className="input-group">
                <input
                    type="text"
                    ref={input => (this.input = input)}
                    className="form-control"
                    defaultValue={shareURL}
                />
                <span className="input-group-btn">
                    <button
                        className="btn btn-default"
                        type="button"
                        onClick={this.onCopyClick}>
                        <i className="glyphicon glyphicon-copy" />
                    </button>
                </span>
            </div>
        );
    }
}
*/

class _App extends Component {
  constructor(props) {
    super(props);
    // initialize state with Simple data sample
    const { schema, uiSchema, formData, validate } = samples.Simple;
    this.state = {
      form: false,
      schema,
      uiSchema,
      formData,
      validate,
      editor: "default",
      theme: "default",
      liveSettings: {
        validate: true,
        disable: false,
      },
      shareURL: null,
    };
  }

  componentDidMount() {
    const hash = document.location.hash.match(/#(.*)/);
    if (hash && typeof hash[1] === "string" && hash[1].length > 0) {
      try {
        this.load(JSON.parse(atob(hash[1])));
      } catch (err) {
        alert("Unable to load form setup data.");
      }
    } else {
      this.load(samples.Simple);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shouldRender(this, nextProps, nextState);
  }

  load = data => {
    // Reset the ArrayFieldTemplate whenever you load new data
    const { ArrayFieldTemplate, ObjectFieldTemplate } = data;
    // force resetting form component instance
    this.setState({ form: false }, _ =>
      this.setState({
        ...data,
        form: true,
        ArrayFieldTemplate,
        ObjectFieldTemplate,
      })
    );
  };

  onSchemaEdited = schema => this.setState({ schema, shareURL: null });

  onUISchemaEdited = uiSchema => this.setState({ uiSchema, shareURL: null });

  onFormDataEdited = formData => this.setState({ formData, shareURL: null });

  onThemeSelected = (theme, { stylesheet, editor }) => {
    this.setState({ theme, editor: editor ? editor : "default" });
    setImmediate(() => {
      // Side effect!
      document.getElementById("theme").setAttribute("href", stylesheet);
    });
  };

  setLiveSettings = ({ formData }) => this.setState({ liveSettings: formData });

  onFormDataChange = ({ formData }) =>
    this.setState({ formData, shareURL: null });

  onShare = () => {
    const { formData, schema, uiSchema } = this.state;
    const {
      location: { origin, pathname },
    } = document;
    try {
      const hash = btoa(JSON.stringify({ formData, schema, uiSchema }));
      this.setState({ shareURL: `${origin}${pathname}#${hash}` });
    } catch (err) {
      this.setState({ shareURL: null });
    }
  };

  render() {
    const {
      schema,
      uiSchema,
      formData,
      liveSettings,
      validate,
      editor,
      ArrayFieldTemplate,
      ObjectFieldTemplate,
      transformErrors,
    } = this.state;

    let { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar className={classes.toolbar}>
            <Typography variant="title">
              React JsonSchema Form - Material UI
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          open={true}
          className={classes.drawer}
          classes={{ paper: classes.drawerPaper }}>
          <div className={classes.toolbar} />
          <Selector onSelected={this.load} />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Grid container spacing={24}>
            <Grid item xs={6}>
              <Grid item>
                <MuiForm
                  uiTheme={uiTheme}
                  schema={liveSettingsSchema}
                  formData={liveSettings}
                  onChange={this.setLiveSettings}>
                  <div />
                </MuiForm>
              </Grid>
              <Grid item>
                <Editor
                  title="JSONSchema"
                  theme={editor}
                  code={toJson(schema)}
                  onChange={this.onSchemaEdited}
                />
              </Grid>
              <Grid item>
                <Editor
                  title="UISchema"
                  theme={editor}
                  code={toJson(uiSchema)}
                  onChange={this.onUISchemaEdited}
                />
              </Grid>

              <Grid item>
                <Editor
                  title="formData"
                  theme={editor}
                  code={toJson(formData)}
                  onChange={this.onFormDataEdited}
                />
              </Grid>
            </Grid>
            <Grid item xs={6}>
              {this.state.form && (
                <MuiForm
                  uiTheme={uiTheme}
                  ArrayFieldTemplate={ArrayFieldTemplate}
                  ObjectFieldTemplate={ObjectFieldTemplate}
                  liveValidate={liveSettings.validate}
                  disabled={liveSettings.disable}
                  schema={schema}
                  uiSchema={uiSchema}
                  formData={formData}
                  onChange={this.onFormDataChange}
                  onSubmit={({ formData }) =>
                    console.log("submitted formData", formData)
                  }
                  ErrorList={ErrorList}
                  fields={{ geo: GeoPosition }}
                  validate={validate}
                  onBlur={(id, value) =>
                    console.log(`Touched ${id} with value ${value}`)
                  }
                  onFocus={(id, value) =>
                    console.log(`Focused ${id} with value ${value}`)
                  }
                  transformErrors={transformErrors}
                  onError={log("errors")}>
                  <div>
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      style={{ margin: "12px" }}>
                      Submit
                    </Button>
                  </div>
                </MuiForm>
              )}
            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
}

function withRoot(Component) {
  function WithRoot(props) {
    return (
      <MuiThemeProvider theme={uiTheme}>
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }
  return WithRoot;
}

let App = withRoot(withStyles(styles)(_App));
render(<App />, document.getElementById("app"));

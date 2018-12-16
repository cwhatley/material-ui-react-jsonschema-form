import Form from "react-jsonschema-form";
import ArrayFieldTemplate from "./ArrayFieldTemplate";
import ObjectFieldTemplate from "./ObjectFieldTemplate";
import FieldTemplate from "./FieldTemplate";
import ErrorList from "./ErrorList";
import { getDefaultRegistry } from "react-jsonschema-form/lib/utils";

import mui_fields from "./fields";
import mui_widgets from "./widgets";

export default class MuiForm extends Form {
  static defaultProps = {
    ErrorList: ErrorList,
    ...Form.defaultProps,
  };

  getRegistry() {
    const { fields, widgets } = getDefaultRegistry();
    return {
      fields: { ...fields, ...mui_fields, ...this.props.fields },
      widgets: { ...widgets, ...mui_widgets, ...this.props.widgets },
      ArrayFieldTemplate: this.props.ArrayFieldTemplate || ArrayFieldTemplate,
      ObjectFieldTemplate:
        this.props.ObjectFieldTemplate || ObjectFieldTemplate,
      FieldTemplate: this.props.FieldTemplate || FieldTemplate,
      definitions: this.props.schema.definitions || {},
      formContext: this.props.formContext || {},
    };
  }
}

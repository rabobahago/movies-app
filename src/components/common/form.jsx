import React, { Component } from "react";
import Input from "./input";
import Joi from "joi-browser";
import Select from "./select";
class Form extends Component {
  state = {
    data: {},
    errors: {},
  };
  validateProperty = ({ name, value }) => {
    let obj = { [name]: value };
    let schema = { [name]: this.schema[name] };
    let { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  validate = () => {
    const options = {
      abortEarly: false,
    };
    let { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    let errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };
  handleChange = (e) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.currentTarget);
    if (errorMessage) errors[e.currentTarget.name] = errorMessage;
    else delete errors[e.currentTarget.name];
    const { name, value } = e.currentTarget;
    const data = { ...this.state.data };
    data[name] = value;
    this.setState({ data, errors });
  };
  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let errors = this.validate();
    this.setState({ errors: errors || {} });
    this.doSubmit();
  };
  renderButton = (label) => {
    return (
      <button className="btn btn-primary" disabled={this.validate()}>
        {label}
      </button>
    );
  };
  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };
}
export default Form;

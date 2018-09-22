import _ from 'lodash'
import React, {Component} from 'react'
import {Field, reduxForm} from 'redux-form'
import {Link} from "react-router-dom"
import {connect} from 'react-redux'
import {createPosts} from "../actions"

const FIELDS = {
  title: {
    msg: 'Please enter a title'
  },
  categories: {
    msg: 'Please enter a category'
  },
  content: {
    msg: 'Please enter some content'
  }
};

class PostsNew extends Component {
  renderInput(field) {
    const {meta: {touched, error}} = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className='form-control'
          type='text'
          {...field.input}
        />
        <span className='text-help'>{touched ? error : ''}</span>
      </div>
    )
  }

  renderTextarea(field) {
    const {meta: {touched, error}} = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return(
      <div className={className}>
        <label>{field.label}</label>
        <textarea
          className='form-control'
          rows='5'
          {...field.input}
        />
        <span className='text-help'>{touched ? error : ''}</span>
      </div>
    )
  }

  onSubmit(values) {
    this.props.createPosts(values, () => {
      this.props.history.push('/')
    })
  }

  render() {
    const {handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
        label='Title'
        name='title'
        component={this.renderInput}
        />
        <Field
        label='Categories'
        name='categories'
        component={this.renderInput}
        />
        <Field
        label='Post Content'
        name='content'
        component={this.renderTextarea}
        />
        <button type='submit' className='btn btn-primary'>Submit</button>
        <Link className='btn btn-default' to='/'>
          Cancel
        </Link>
      </form>
    )
  }
}

function validate(values) {
  const errors = {};

  _.each(FIELDS, (type, field) => {
    if (!values[field]) {
      errors[field] = _.values(type)
    }
  });

  return errors
}

export default reduxForm({
  form: 'PostsNewForm',
  fields: _.keys(FIELDS),
  validate
})(
  connect(null,{createPosts})(PostsNew)
)
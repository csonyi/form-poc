/* eslint-disable no-template-curly-in-string */
/* eslint-disable-next-line no-undef */

import React from 'react'

import { Formik, Field, Form } from 'formik'

import * as yup from "yup";

import TextInput from '@instructure/ui-forms/lib/TextInput'
import Button from '@instructure/ui-buttons/lib/Button'
import Checkbox from '@instructure/ui-checkbox/lib/Checkbox'

const cbLabel = "I agree to the Acceptable Use Policy and acknowledge the Privacy Policy."

const createErrorFromMessage = (text) => {
  if(text) {
    return [{
      text,
      type: 'error',
    }]
  }
  return []
}

const validationSchema = yup.object().shape({
  name: yup.string()
    .required('Name is required')
    .max(255, "Name can't exceed ${max} characters"),
  email: yup.string()
    .required('Email is required')
    .max(100, "Email can't exceed ${max} characters")
    .email('Must be a valid email address'),
  confirmEmail: yup.string()
    .required('Email confirmation is required')
    .max(100, "Email confirmation can't exceed ${max} characters")
    .email('Must be a valid email address')
    .oneOf([yup.ref('email')], "Email addresses don't match"),
  termsOfUse: yup.bool()
    .oneOf([true], 'You must agree to the Acceptable Use Policy'),
})

const FormikForm = () => {
  const handleSubmit = (data) => console.table({
    Submitted: data
  })
  
  const initialValues = {
    name: '',
    email: '',
    confirmEmail: '',
    termsOfUse: false,
  }

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnBlur
    >
      {({ errors, touched }) => (
        <Form className="formPoc">
          <Field 
            as={TextInput}
            id="name"
            name="name"
            type="text"
            label="Full Name"
            messages={touched.name && createErrorFromMessage(errors.name)}
          />
          <Field
            as={TextInput}
            id="email"
            name="email"
            type="email"
            label="Email"
            messages={touched.email && createErrorFromMessage(errors.email)}
          />
          <Field
            as={TextInput}
            id="confirmEmail"
            name="confirmEmail"
            type="email"
            label="Confirm Email"
            messages={touched.confirmEmail && createErrorFromMessage(errors.confirmEmail)}
          />
          <Field
            as={Checkbox}
            id="termsOfUse"
            name="termsOfUse"
            label={cbLabel}
            messages={touched.termsOfUse && createErrorFromMessage(errors.termsOfUse)}
          />
          <Button 
            type="submit" 
            color="primary"
            size="large"
            display="block"
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default FormikForm;
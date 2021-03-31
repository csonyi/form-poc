import React from 'react'

import { Formik, Field, Form } from 'formik'

import TextInput from '@instructure/ui-forms/lib/TextInput'
import Button from '@instructure/ui-buttons/lib/Button'
import Checkbox from '@instructure/ui-checkbox/lib/Checkbox'

const cbLabel = "I agree to the Acceptable Use Policy and acknowledge the Privacy Policy."

const makeError = (text) => ({
  text,
  type: 'error',
})

export default function FormikForm(props) {
  const handleSubmit = (data) => {
    console.log("Submitted:")
    console.log(data)
  }
  const initialValues = {
    name: '',
    email: '',
    confirmEmail: '',
    termsOfUse: false,
  }

  const nameValidate = (name) => {
    if(name === '') {
      return [makeError('Name is Required')]
    }
    if(name.length > 255) {
      return [makeError("Name can't exceed 255 characters")]
    }
    return [];
  }

  const emailValidate = (email) => {
    if(email === '') {
      return [makeError('Email is required')]
    }
    if(email.length > 100) {
      return [makeError("Email can't exceed 100 characters")]
    }
    if(!(/.+@.+/).test(email)) {
      return [makeError('Must be a valid email address')]
    }
    return []
  }

  const confirmEmailValidate = (confirmEmail, email) => {
    if(confirmEmail === '') {
      return [makeError('Email confirmation is required')]
    }
    if(confirmEmail.length > 100) {
      return [makeError("Email confirmation can't exceed 100 characters")]
    }
    if(!(/.+@.+/).test(confirmEmail)) {
      return [makeError('Must be a valid email address')]
    }
    if(confirmEmail !== email) {
      return [makeError("Email addresses don't match")]
    }
    return []
  }

  const validateTermsOfUse = (termsOfUse) => {
    return (termsOfUse) ? [] : [makeError('You must agree to the Acceptable Use Policy')]
  }

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      {({ errors, values }) => (
        <Form className="formPoc">
          <Field 
            as={TextInput}
            id="name"
            name="name"
            type="text"
            label="Full Name"
            validate={nameValidate}
            messages={errors.name}
          />
          <Field
            as={TextInput}
            id="email"
            name="email"
            type="email"
            label="Email"
            validate={emailValidate}
            messages={errors.email}
          />
          <Field
            as={TextInput}
            id="confirmEmail"
            name="confirmEmail"
            type="email"
            label="Confirm Email"
            validate={(confirmEmail) => confirmEmailValidate(confirmEmail, values.email)}
            messages={errors.confirmEmail}
          />
          <Field
            as={Checkbox}
            id="termsOfUse"
            name="termsOfUse"
            label={cbLabel}
            validate={validateTermsOfUse}
            messages={errors.termsOfUse}
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
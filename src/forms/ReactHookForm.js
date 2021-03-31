import React from 'react'

import { useForm } from "react-hook-form";

import TextInput from '@instructure/ui-forms/lib/TextInput'
import Button from '@instructure/ui-buttons/lib/Button'
import Checkbox from '@instructure/ui-checkbox/lib/Checkbox'

const cbLabel = "I agree to the Acceptable Use Policy and acknowledge the Privacy Policy."

export default function ReactHookForm(props) {
  const { register, handleSubmit, getValues, errors } = useForm()
  const onSubmit = (data) => console.table({
    Submitted: data
  })

  const getErrorsForField = (name) => {
    if(errors[name]) {
      return [{
        text: errors[name].message,
        type: 'error',
      }]
    }
    return []
  }

  return (
    <form className="formPoc" onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        name="name"
        type="text"
        label="Full Name"
        messages={getErrorsForField("name")}
        inputRef={register({
          required: 'Name is Required',
          maxLength: {
            value: 255,
            message: "Name can't exceed 255 characters",
          },
        })}
       />

       <TextInput
        name="email"
        type="email"
        label="Email"
        messages={getErrorsForField("email")}
        inputRef={register({
          required: 'Email is required',
          maxLength: {
            value: 100,
            message: "Email can't exceed 100 characters"
          },
          pattern: {
            value: /.+@.+/,
            message: 'Must be a valid email address'
          },
        })}
       />
       <TextInput
        name="confirmEmail"
        type="email"
        label="Confirm Email"
        messages={getErrorsForField("confirmEmail")}
        inputRef={register({
          required: 'Email confirmation is required',
          maxLength: {
            value: 100,
            message: "Email confirmation can't exceed 100 characters"
          },
          pattern: {
            value: /.+@.+/,
            message: 'Must be a valid email address'
          },
          validate: (confirmEmail) => confirmEmail === getValues("email") || "Email addresses don't match",
        })}
       />
      <Checkbox
        name="termsOfuse"
        label={cbLabel}
        inputRef={register({
          required: 'You must agree to the Acceptable Use Policy',
        })}
      />
      <Button 
        type="submit" 
        color="primary"
        size="large"
        display="block"
      >
        Submit
      </Button>
    </form>
  )
}
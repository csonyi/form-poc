import React from 'react'
import './App.css';
import FormikForm from './forms/FromikForm';
import ReactHookForm from './forms/ReactHookForm';

import View from '@instructure/ui-layout/lib/View'

const viewProps = {
  as: 'div',
  margin: 'small',
  padding: 'xx-large',
  textAlign: 'center',
  background: 'primary',
  borderRadius: 'medium',
  shadow: 'topmost'
}

function App() {
  return (
    <div className="App">
      <View { ...viewProps }>
        <h1>React Hook Form</h1>
        <ReactHookForm />
      </View>
      <View { ...viewProps }>
        <h1>Formik</h1>
        <FormikForm />
      </View>
    </div>
  );
}

export default App;

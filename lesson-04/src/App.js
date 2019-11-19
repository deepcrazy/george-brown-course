import React from 'react'
import './App.css'
import ErrorMessage from './ErrorMessage'

function useCustomHook() {
  const [value, setValue] = React.useState('')
  const onChange = event => setValue(event.target.value)
  return {
    value,
    onChange,
  }
}

function InputField({ inputClassName, type, placeholder, labelText, value, onChange }) {
  // const [isFocussed, setIsFocussed] = React.useState(false);
  const inputFieldValue = { value }
  if (inputFieldValue.value == "")
    var error = ErrorMessage({ label: "Please enter " + labelText });
  return (
    <label className='FormField-Label'>
      <span className='FormField-LabelText'>{labelText}</span>
      <input
        className={inputClassName}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />

      {error}
    </label>
  )
}

function RadioField({ type, value, checked, onChange, labelText }) {
  return (
    <label className='FormField-Label FormField-Label__Radio'>
      <span className='FormField-LabelText FormField-LabelText__Radio'>
        <input
          className='FormField-Input FormField-Input__Radio'
          type={type}
          value={value}
          checked={checked}
          onChange={onChange}
        />
        {labelText}
      </span>
    </label>
  )
}

export default function App() {

  const firstNameState = useCustomHook()
  const lastNameState = useCustomHook()

  const [isAbove19, setIsAbove19] = React.useState(false)
  const onChangeAbove19 = event => setIsAbove19(event.target.checked)

  const [diet, setDiet] = React.useState(null)
  const onChangeDiet = event => setDiet(event.target.value)

  const onClickSubmit = () => {
    console.log('Clicked submit button!')
  }

  const [state, setState] = React.useState(navigator.onLine)

  React.useEffect(() => {
    const onlineFn = () => {
      setState(true)
    }
    const offlineFn = () => {
      setState(false)
    }
    window.addEventListener('online', onlineFn)

    window.addEventListener('offline', offlineFn)

    return () => {
      window.removeEventListener('online', onlineFn)
      window.removeEventListener('offline', offlineFn)
    }
  }, [])

  function disableSubmitButtonFn() {
    if (firstNameState.value == "" || lastNameState.value == "" || !diet || !state) {
      return true
    }
  }

  // React.useEffect(() => {
  //   const timer = setTimeout(() => {
  //     console.log('This will run after 5 second!')
  //   }, 5000);
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <div className='App'>
      <div className='App-Content'>
        <h1 className='App-Title'>Registration Form</h1>

        <div className='FormField'>
          <InputField
            inputClassName='FormField-Input FormField-Input__Text'
            type='text'
            placeholder='Enter your first name'
            labelText='First Name'
            value={firstNameState.value}
            onChange={firstNameState.onChange}
          />
          {firstNameState.value}
        </div>

        <div className='FormField'>
          <InputField
            inputClassName='FormField-Input FormField-Input__Text'
            type='text'
            placeholder='Enter your last name'
            labelText='Last Name'
            value={lastNameState.value}
            onChange={lastNameState.onChange}
          />
          {lastNameState.value}
        </div>

        <div className='FormField'>
          <label className='FormField-Label'>
            <span className='FormField-LabelText'>
              <input
                className='FormField-Input FormField-Input__Checkbox'
                type='checkbox'
                checked={isAbove19}
                onChange={onChangeAbove19}
              />
              Above 19?
            </span>
          </label>
        </div>

        <div className='FormField'>
          <div className='FormField-Heading'>Diet Restriction</div>

          <RadioField
            type='radio'
            value='vegetarian'
            checked={diet === 'vegetarian'}
            onChange={onChangeDiet}
            labelText='Vegetarian'
          />

          <RadioField
            type='radio'
            value='vegan'
            checked={diet === 'vegan'}
            onChange={onChangeDiet}
            labelText='Vegan'
          />

          <RadioField
            type='radio'
            value='halal-kosher'
            checked={diet === 'halal-kosher'}
            onChange={onChangeDiet}
            labelText='Halal/Kosher'
          />

          <RadioField
            type='radio'
            value='none'
            checked={diet === 'none'}
            onChange={onChangeDiet}
            labelText='None'
          />
        </div>
        {state ? "Online" : "Offline"}

        <div className='FormSubmit'>
          <button className='FormSubmit-Button' onClick={onClickSubmit} disabled={disableSubmitButtonFn()}>
            Register
          </button>
        </div>
      </div>
    </div>
  )
}

import React from 'react'
import './App.css'

export default function App() {
  return (
    <div className='App'>
      <div className='App-content'>
        <h1>Registration Form</h1>
        {/*=== Your content goes here 👇 ===*/}
        <form>
          <label>
            First Name:
            <input type='text' name='name' defaultValue='Deepanshu' />
          </label>
          <br></br>
          <label>
            Last Name:
            <input type='text' name='name' defaultValue='Gupta' />
          </label>
          <br></br>
          <input type='checkbox'></input>
          <label>Age 19+</label>

          <div class='Container_Section Container_Section__Column'>
            <p class='Container_Headline mdc-typography--headline6'>
              Diet restrictions
            </p>
            <div>
              <label>
                Vegetarian
                <input type='radio'></input>
              </label>
              <label>
                Vegan
                <input type='radio'></input>
              </label>
              <label>
                Halal/Kosher
                <input type='radio'></input>
              </label>
              <label>
                None
                <input type='radio'></input>
              </label>
            </div>
          </div>
          <br></br>
          <label>
            Current Year
            <input type='text' defaultValue='2019'></input>
          </label>
        </form>
      </div>
    </div>
  )
}

import './App.css'
import React from 'react'

export default function App() {

  const [isNarrow, setIsNarrow] = React.useState(window.innerWidth < 600);

  React.useEffect(() => {

    const onResize = () => {
      if (!isNarrow && window.innerWidth < 600){
        setIsNarrow(true)
      } else if (isNarrow && window.innerWidth > 600) {
        setIsNarrow(false)
      }
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [isNarrow])

  return (
    <div className='App'>
      <div className='App-Content'>
        <h1 className='App-Title'>Feedback Form</h1>

        {!isNarrow && (
          <div>
          <h3 className='App-SubTitle' id="ratingSection">Give a rating based on your experience</h3>
          <Exercise1 />
          </div>
        )
     }

        <h3 className='App-SubTitle' id="checkboxSection">
          Select all options based on your experience
        </h3>
        <Exercise2 />
      </div>
    </div>
  )
}

function Exercise1() {
  // Put your answers here for Exercise 1 👇

  const [foodValue, setFoodValue] = React.useState(null)
  const onChangeFoodValue = event => setFoodValue(event.target.value)

  const [poolValue, setPoolValue] = React.useState(null)
  const onChangePoolValue = event => setPoolValue(event.target.value)

  const [bedValue, setBedValue] = React.useState(null)
  const onChangeBedValue = event => setBedValue(event.target.value)

  const [showerValue, setShowerValue] = React.useState(null)
  const onChangeShowerValue = event => setShowerValue(event.target.value)

  const valuesArray = []
  if (foodValue != null || poolValue != null || bedValue != null || showerValue != null) {
    valuesArray.push(foodValue)
    valuesArray.push(poolValue)
    valuesArray.push(bedValue)
    valuesArray.push(showerValue)
  }

  // console.log(valuesArray)
  const newArray = []
  valuesArray.forEach((item) => {
    if (item != null) {
      newArray.push(parseInt(item))
    }
  })
  // console.log(newArray)
  const avgValue = newArray.length !== 0 ? newArray.reduce((a, b) => a + b) / newArray.length : ""

  // var [displaySection, setDisplaySection] = React.useEffect(null)
  
  // React.useEffect(() => {
    
  //   const setDisplaySectionFn = () => {
  //     if (window.innerWidth <= 600)
  //       var section = document.getElementById("checkboxSection").hide();
  //     setDisplaySection(
  //       displaySection = section
  //     )
  //   }

  //   window.addEventListener('resize', setDisplaySectionFn)
  // }, [])

  return (
    <div>
      <RatingItem onChange={onChangeFoodValue} name='food' label='FOOD'></RatingItem>
      <RatingItem onChange={onChangePoolValue} name='pool' label='POOL'></RatingItem>
      <RatingItem onChange={onChangeBedValue} name='beds' label='BEDS'></RatingItem>
      <RatingItem onChange={onChangeShowerValue} name='showers' label='SHOWERS'></RatingItem>

      <div>
        Average value: {avgValue}
      </div>
    </div>

  )
}

function RatingItem({ onChange, name, label }) {
  return (
    <div>
      {label}:
      <RatingValue onChange={onChange} name={name} value='1'></RatingValue>
      <RatingValue onChange={onChange} name={name} value='2'></RatingValue>
      <RatingValue onChange={onChange} name={name} value='3'></RatingValue>
      <RatingValue onChange={onChange} name={name} value='4'></RatingValue>
      <RatingValue onChange={onChange} name={name} value='5'></RatingValue>
    </div>
  )
}

function RatingValue({ onChange, name, value }) {
  return (
    <label>
      <input onChange={onChange} name={name} type="radio" value={value}></input>
      <span>{value}</span>
    </label>
  )
}


function Exercise2() {
  // Put your answers here for Exercise 2 👇

  const [remainingCount, setRemainingCount] = React.useState(3)
  const onChange = event => {
    if (event.target.checked)
      setRemainingCount(remainingCount - 1)
    else
    setRemainingCount(remainingCount + 1)
  }

  return (
    <div>
    <CheckBoxItem onChange={onChange} label= 'Did you enjoy your stay?'></CheckBoxItem>
    <CheckBoxItem onChange={onChange} label='Will you consider returning again?'></CheckBoxItem>
    <CheckBoxItem onChange={onChange} label='Would you recommend our service?'></CheckBoxItem>
    <div>
      Total Remaining: {remainingCount}
    </div>
    </div>
  )
}

function CheckBoxItem({label, onChange}) {
  return (
    <div>
      <CheckBoxValue onChange={onChange} label={label}></CheckBoxValue>
    </div>
  )
}

function CheckBoxValue({ label, onChange }) {
  return (
    <label>
      <input onChange={onChange} type="checkbox"></input>
      <span>{label}</span>
    </label>
  )
}

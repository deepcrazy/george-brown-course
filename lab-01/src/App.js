import './App.css'
import React from 'react'
import FormTitle from './components/FormTitle'
import FormTextInput from './components/FormTextInput'
import LoadingScreen from './components/LoadingScreen'
import fetchData from './utils/fetchData'
import getRandomId from './utils/getRandomId'

const LIST_URL =
  'https://gist.githubusercontent.com/amsul/3b6edcbb9bbc42b231089b6ebad38cb9/raw/6cfee9781998199548f579d0082f3d3a05f20321/data.json'

export default function App() {


  var list_url_data = []
  const [listData, setListData] = React.useState([])
  function getListUrlData() {
    return fetch(LIST_URL)
      .then(response => response.json())
      .then((jsonData) => {
        // console.log(jsonData)
        setListData(jsonData)

      })
      .catch((error) => {
        console.error(error)
        return error
      })
  }

  // const [localStorageList, setlocalStorageList] = React.useState([])
  
  function setLocalStorage() {
    localStorage.setItem("list", JSON.stringify(listData))
    // console.log(JSON.parse(localStorage.getItem("list")))
    return JSON.parse(localStorage.getItem("list"))
  }

  React.useEffect(() => {
    const onload = () => {
      getListUrlData()

    }
    window.addEventListener('load', onload)

    return () => {
      window.removeEventListener('load', onload)
    }
  }, [])

  const [removeItem, setRemoveItem] = React.useState([])
  const [inputData, setInputData] = React.useState('')

  const onClickDelete = (event) => {
    console.log(newLocalStorageList)
    setRemoveItem(event.target.id)
    const newListdata = listData.filter((item) => {
      return item.id != event.target.id
    })
    setListData(newListdata)
    console.log(newListdata)
  }

  function keyPress(event) {
    console.log(event.key)
  }

  console.log(removeItem)

  let newLocalStorageList = []

  // const [newLocalStorageList, setnewLocalStorageList] = React.useState([])
  function onCheckboxClick(event) {
    console.log(event.target.id)
    console.log(listData)
    newLocalStorageList = listData
    console.log(listData)
    let element;
    newLocalStorageList.map((element) => {
      if (element.id == event.target.id)
        element.completed = !element.completed
    })
    setListData([...newLocalStorageList])

  }

  function ListItem({ value }) {
    if (listData.length > 0) {
      newLocalStorageList = setLocalStorage()
      // console.log(listData[0].label)
      const listElement = listData.map((item, index) => {
        return (
          <div key={index}>
            <input id={item.id} type="checkbox" checked={item.completed} onChange={onCheckboxClick}></input>
            <span style={item.completed ? { "textDecoration": "line-through" } : {}}>
              {item.label}
            </span>
            <button id={item.id} onClick={onClickDelete}>Delete
            </button>
          </div>
        )
      })
      return listElement
    }
    else {
      return ''
    }
  }


  function submitButtonData(event) {
    event.preventDefault();
    if ((/\S/.test(inputData))) {
      const newListItem = {
        id: getRandomId(),
        completed: false,
        label: inputData
      }
      newLocalStorageList.push(newListItem)
      setListData(newLocalStorageList)
    }
    console.log(newLocalStorageList)
    setInputData("")
  }
  return (
    <div className='App'>
      <div className='App-Content'>
        <div>
          <FormTitle>To-Do List</FormTitle>

          {/* Put your solution here 👇 */}

          <div>
            <ListItem></ListItem>
          </div>
          <form>
            <div>
              <FormTextInput
                placeholder="Enter a new to-do item"
                value={inputData}
                type="text"
                setValue={setInputData}
                onKeyPress={keyPress}
              // {keyPress} == "Enter" ? 
              >
              </FormTextInput>
              <button type="submit" onClick={submitButtonData}>
                Add
            </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  )
}

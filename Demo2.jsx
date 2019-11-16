import React from 'react'

function sendDataToBackend() {
  // Dummy no-op
}

function useTextInputState() {
  const [value, setValue] = React.useState('')
  const onChange = event => setValue(event.target.value)
  return {
    value,
    onChange,
  }
}

function FormField({ placeholder, labelText, value, onChange }) {
  return (
    <label>
      <div className='FormField-Text'>{labelText}</div>
      <input
        type='text'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </label>
  )
}

export function NameFields() {
  const firstNameState = useTextInputState()
  const lastNameState = useTextInputState()

  const saveName = () =>
    sendDataToBackend({
      firstName: firstNameState.value,
      lastName: lastNameState.value,
    })

  return (
    <div>
      <FormField
        placeholder='Enter your first name'
        labelText='First Name'
        value={firstNameState.value}
        onChange={firstNameState.onChange}
      />
      <FormField
        placeholder='Enter your last name'
        labelText='Last Name'
        value={lastNameState.value}
        onChange={lastNameState.onChange}
      />
      <button onClick={saveName}>Save</button>
    </div>
  )
}

// function TextInputBar({ renderPrefix }) {
//   return (
//     <div>
//       {renderPrefix && renderPrefix()}
//       <input type='text' />
//     </div>
//   )
// }

// function SearchBar() {
//   return <TextInputBar renderPrefix={() => <SearchIcon />} />
// }

// function HeaderBar() {
//   return <TextInputBar renderPrefix={() => <MenuIcon />} />
// }

function List({ children }) {
  return <ul className='List'>{children}</ul>
}

function ListItem({ children }) {
  return <li className='List-Item'>{children}</li>
}

export function HeaderList() {
  return (
    <List>
      <ListItem>Home</ListItem>
      <ListItem>Product</ListItem>
      <ListItem>Pricing</ListItem>
    </List>
  )
}

export function FooterList() {
  return (
    <List>
      <ListItem>Company</ListItem>
      <ListItem>FAQ</ListItem>
      <ListItem>Contact</ListItem>
      <ListItem>...</ListItem>
      <ListItem>...</ListItem>
    </List>
  )
}
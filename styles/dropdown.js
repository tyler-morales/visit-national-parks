const searchStyles = {
  option: (provided, state) => ({
    ...provided,
    cursor: 'pointer',
    background: state.isFocused ? '#bbf7d0' : 'white',
    color: 'black',
  }),

  indicatorSeparator: (provided) => ({
    ...provided,
    background: 'darkgray',
  }),

  dropdownIndicator: (provided) => ({
    ...provided,
    color: 'darkgray',
  }),

  control: (provided) => ({
    ...provided,
    padding: '5px 10px',
    display: 'flex',
    background: '#eaeaea',
    borderRadius: '10px',
  }),
}
const dropdownStyles = {
  option: (provided, state) => ({
    ...provided,
    cursor: 'pointer',
    background: state.isFocused ? '#bbf7d0' : 'white',
    color: 'black',
  }),

  indicatorSeparator: (provided) => ({
    ...provided,
    background: 'darkgray',
  }),

  dropdownIndicator: (provided) => ({
    ...provided,
    color: 'darkgray',
  }),

  control: (provided) => ({
    ...provided,
    padding: '5px 10px',
    display: 'flex',
    background: '#eaeaea',
    borderRadius: '10px',
  }),

  multiValueLabel: (provided) => ({
    ...provided,
    background: '#eaeaea',
  }),
}

export {searchStyles, dropdownStyles}

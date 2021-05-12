import React from 'react';

export default function LocaleSwitcher(props) {
  return (
    <>
      <button
        type="button"
        onClick={props.toggleFunction}
      >
        Toggle locale
      </button>
      <hr />
    </>
  )
}

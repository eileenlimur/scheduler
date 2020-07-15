import React from 'react';
import classnames from 'classnames';

export default function Empty(props) {
  let appointmentClass = classnames("appointment__add", {
    "appointment__add-last": props.id === "last"
  })
  return (
    <main className={appointmentClass}>
      <img
        className='appointment__add-button'
        src='images/add.png'
        alt='Add'
        onClick={props.onAdd}
      />
    </main>
  )
}
import React from 'react';
import classnames from 'classnames';
import 'components/InterviewerListItem.scss'

//id: number: id of interviewer
//name: string: name of interviewer
//avatar: url: interview image;
//selected: boolean
//setInterviewer: sets interviewer upon selection

export default function InterviewerListItem (props) {
  const className = classnames('interviewers__item', {
  'interviewers__item--selected': props.selected })
  return (
    <li className={className} id={props.id} onClick={props.setInterviewer}>
      <img
        className='interviewers__item-image'
        // src="https://i.imgur.com/LpaY82x.png"
        // alt='Sylvia Palmer'
        src={props.avatar}
        alt={props.name}
      />
      {props.name}
    </li>
  )
}
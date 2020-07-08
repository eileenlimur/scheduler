import React from 'react';
import classnames from 'classnames';
import 'components/InterviewerListItem.scss'

//id: number: id of interviewer
//name: string: name of interviewer
//avatar: url: interview image;
//selected: boolean
//setInterviewer: sets interviewer upon selection

export default function InterviewerListItem (props) {
  const interviewerClass = classnames('interviewers__item', {
  'interviewers__item--selected': props.selected })
  return (
    <li className={interviewerClass} id={props.id} onClick={props.setInterviewer}>
      <img
        className='interviewers__item-image'
        src={props.avatar}
        alt={props.name}
      />
      {props.name}
    </li>
  )
}
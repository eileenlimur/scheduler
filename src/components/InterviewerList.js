import React from 'react';
import 'components/InterviewerList.scss'
import InterviewerListItem from 'components/InterviewerListItem';
//inteviewers:array
//interviewer:number:id of interviewer
//setInterviewer:function:funciton accepts interviewer id

export default function InterviewList(props) {

  const interviewers = props.interviewers.map(interviewer=> (
    <InterviewerListItem
    className='interviewers__header__list'
    key={interviewer.id}
    name={interviewer.name}
    avatar={interviewer.avatar}
    selected={interviewer.id === props.value}
    setInterviewer={() => props.onChange(interviewer.id)}
    />
  ))
  return (
  <section className="interviewers">
    <h4 className="interviewers__header text--light">Interviewer</h4>
    <ul className="interviewers__list">{interviewers}</ul>
  </section>
  )}
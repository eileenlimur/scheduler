import React from 'react';
import 'components/InterviewerList.scss'
import InterviewerListItem from 'components/InterviewerListItem';
//inteviewers:array
//interviewer:number:id of interviewer
//setInterviewer:function:funciton accepts interviewer id

export default function InterviewList(props) {
  const interviewers = props.interviewers.map(interviewer=> (
    <InterviewerListItem
    id={interviewer.id}
    name={interviewer.name}
    avatar={interviewer.avatar}
    />
  ))

  return (
    <section className='interviewers'>
      <h4 className='interviewers__header text--light'>Interviewer</h4>
      <ul className='interviewers__list'></ul>
    </section>
  )
}
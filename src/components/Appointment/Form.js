import React, {useState} from 'react';
import Button from 'components/Button'
import InterviewerList from 'components/InterviewerList'

// The Form component should track the following state:

// name:String
// interviewer:Number
// The Form component should have the following actions:

// setName:Function
// setInterviewer:Function
// The Form component should take the following props:

// name:String
// interviewers:Array
// interviewer:Number
// onSave:Function
// onCancel:Function

export default function Form(props) {
  const [name, setName] = useState(props.name || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const reset=function(){
    setName("");
    setInterviewer(null);    
  }
  const cancel=function() {
    reset();
    props.onCancel();
  };

  return (
  <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off" onSubmit={event=>event.preventDefault()}>
        <input
          className="appointment__create-input text--semi-bold"
          value={name}
          type="text"
          placeholder="Enter Student Name"
          onChange={(event) => setName(event.target.value)}
        />
      </form>
      <InterviewerList
        interviewers={props.interviewers}
        name={interviewer}
        onChange={(event) => setInterviewer(event)} />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
        <Button confirm onClick={props.onSave(interviewer, name)}>Save</Button>
      </section>
    </section>
  </main>
  )
}
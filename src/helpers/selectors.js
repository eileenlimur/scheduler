export function getAppointmentsForDay(state, day) {
  const match = state.days.filter(dayItem => dayItem.name === day)
  console.log(match);
  const appointmentsMatch = [];
  if (match.length > 0) {
    Object.keys(state.appointments).forEach(id => {
      if (match[0].appointments.includes(state.appointments[id].id)) {
        appointmentsMatch.push(state.appointments[id]);
      }
    })
  }
  return appointmentsMatch;
}

export function getInterview(state, interview) {
  let interviewerId = null;
  if (interview !== null) {
    interviewerId = interview.interviewer;
  }
  const interviewer = state.interviewers[interviewerId]
  return {student: interview.student, interviewer}
}
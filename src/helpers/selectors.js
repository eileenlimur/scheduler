export function getAppointmentsForDay(state, day) {
  const match = state.days.filter(dayItem => dayItem.name === day)
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
    const interviewer = state.interviewers[interviewerId]
    return {student: interview.student, interviewer}
  }
  return null;
}

export function getInterviewersForDay(state, day) {
  const match = state.days.filter(dayItem => dayItem.name === day)
  if (match.length === 0) {
    return [];
  }
  const interviewerMatch = [];
  if (match.length > 0) {
    Object.keys(state.interviewers).forEach(id => {
      if (match[0].interviewers.includes(state.interviewers[id].id)) {
        interviewerMatch.push(state.interviewers[id]);
      }
    })
  }
  return interviewerMatch;
}
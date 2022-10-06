import React from 'react';
import "components/InterviewerList.scss"
import InterviewerListItem from './InterviewerListItem';

export default function InterviewerList(props) {
  
  const interviewerListItems = props.interviewers.map(viewer => {
    return <InterviewerListItem
      key={viewer.id}
      avatar={viewer.avatar}
      name={viewer.name}
      selected={viewer.id === props.value}
      setInterviewer={() => props.onChange(viewer.id)}
    />
  })

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerListItems}
      </ul>
    </section>
  )
}
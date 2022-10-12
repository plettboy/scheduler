import React from 'react';
import './styles.scss'
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import useVisualMode from 'hooks/useVisualMode';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';


const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

export default function Appointment(props) {


  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = 'SAVING';
  const DELETING = 'DELETING';
  const CONFIRM = "CONFIRM";
  const EDIT = 'EDIT';
  const ERROR_SAVE = 'ERROR_SAVE'
  const ERROR_DELETE = 'ERROR_DELETE';

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  const save = function (name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW);
      })
      .catch(err => {
        transition(ERROR_SAVE, true);
        console.log(err);
      })
  }

  const cancel = function () {

    transition(DELETING);
    props.cancelInterview(props.id)
      .then(() => {
        transition(EMPTY);
      })
      .catch(err => {
        transition(ERROR_DELETE, true);
        console.log(err);
      })
  }
  function deleteInterview() {
    transition(DELETING);
    props.cancelInterview(props.id).then((response) => {
      transition(EMPTY);
    })
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && <Form interviewers={interviewers} onCancel={back}
        onSave={save}
      />}
      {mode === SAVING && <Status message="Saving..." />}
      {mode === DELETING && <Status message="Deleting..." />}
      {mode === CONFIRM && <Confirm message="Are you sure you want to delete this appointment?" onCancel={back} onConfirm={cancel} />}
      {mode === EDIT && <Form student={props.interview.student} interviewer={props.interview.interviewer.id} interviewers={props.interviewers} onCancel={back} onSave={save} />}
    </article>
  );
}

import React from 'react'
import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LoginContext } from '../contexts/LoginContext';
import { pawIconR, pawIconL, pawIcon } from './../assets/icons';

import "./Card.css"
import JobData from './JobData';

export default function JobCard(props) {
  const navigate = useNavigate();
  const params = useParams()

  const { currentUser, userLoggedIn } = useContext(LoginContext);
  const displayDate = (d) => {
    return `${d.slice(8, 10)}/${d.slice(5, 7)}/${d.slice(0, 4)}`
  }
  const displayTime = (t) => {
    return `${t.slice(11, 13)}:${t.slice(14, 16)}`
  }


  const handleDelete = () => {
    if (userLoggedIn && currentUser.id == props.job.user_id) {
        navigate(`/users/${props.job.user_id}/jobs/${props.job.id}/delete`)
    }
}
console.log(userLoggedIn)
const handleEdit = () => {
    if (userLoggedIn && currentUser.id == props.job.user_id)
    navigate(`/users/${props.job.user_id}/jobs/${props.job.id}/edit`)
}
  
  const jobTitle = ( <h2><i className={pawIconL.className}></i>{props.job.title}<i className={pawIconR.className}></i></h2>)

  let buttons;

  if (userLoggedIn && currentUser) {
    if (currentUser.id == props.job.user_id) {
    buttons = <div> <button className='btn btn-delete-job' onClick={handleDelete}>delete</button>
        <button className='btn btn-edit-job' onClick={handleEdit}>edit</button></div>
  } else {
    buttons = <button className='btn btn-apply'>Apply</button>
  }}

  return (
    <div>
      <JobData job={props.job}/>
    </div>
  )
}

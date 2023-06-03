import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { useNavigate} from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext"
import JobCard from '../components/JobCard'
import "./pages.css"

export default function Jobs() {
  const {currentUser, userLoggedIn, API_URL} = useContext(LoginContext);
  const navigate = useNavigate();

  const [jobs, setJobs] = useState(null);

  useEffect(() => {
          fetchAllJobs()
          .then(res => res.json())
          .then(data => setJobs(data))
      }, [])

  const fetchAllJobs = async (id) => {
    const url = API_URL + '/jobs'
    return fetch(url)

  }

  const handleAddNewJob = () => {
    if (currentUser && userLoggedIn) {
      console.log(currentUser)
      console.log(userLoggedIn)
      navigate(`/users/${currentUser.id}/jobs/new`)
    }
      else {
        console.log(currentUser)
          navigate('/users/login')
      }
  }

  let display;

  if (jobs === null) {
    display = <p>Loading...</p>
  } else if (jobs === []) {
    display = <p>No Jobs Found!</p>
  } else {
    display = jobs.map(job => <JobCard key={job.id} job={job}/>)
  }

  return (
    <div className='jobs'>
        <section className='jobs-title-container'>
          <h1 className='browse-jobs-title'>Browse Jobs:</h1>
          <button className='btn btn-add-job' onClick={handleAddNewJob}>Add new Job Posting</button>
        </section>

        <section>
          {display}
        </section>
        

    </div>
  )
}

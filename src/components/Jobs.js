import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function Jobs() {

  const [jobs, setJobs] = useState([])

  useEffect(() => {
    axios.get('http://127.0.0.1:5500/jobs')
      .then(res => res.data)
      .then(result => {
        setJobs(result)
      })
      .catch(err => {
        throw new Error(err.message)
      })

  }, [])

  return (
    <div>
      <h2>Missions</h2>
      <div className="jobs-cards cards">
        {jobs.map(job => (
          <Job job={job} key={job.id} />
        ))
        }
      </div>
    </div>
  );
}

export function Job({ job }) {
  return (
    <div className="job-card card">
      <h3>{job.label}</h3>
      <div className="job-card-body">
        <h4>{job.daily_rate}</h4>
        <p>{job.company_id}</p>
      </div>
    </div>
  )
}
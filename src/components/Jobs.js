import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form } from '.';
import { Link } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';

const jobModel = {
  "label": "",
  "daily_rate": ""
}

export function Jobs() {

  const [jobs, setJobs] = useState([]);
  const [isAddJob, setIsAddJob] = useState(false);
  const [isDeleteJob, setIsDeleteJob] = useState(false);
  const [newJob, setNewJob] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:5500/jobs')
      .then(res => res.data)
      .then(result => {
        setJobs(result)
      })
      .catch(err => {
        throw new Error(err.message)
      })

  }, [isAddJob, isDeleteJob])

  const handleAddJob = (e) => {
    e.preventDefault();
    setIsAddJob(true)
  }

  const handleChange = ({ target: { name, value } }) => {
    setNewJob({ ...newJob, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://127.0.0.1:5500/jobs', newJob)
      .then((response) => {
        console.log(response);
      })
      .then(setIsAddJob(false))
      .then(setNewJob(jobModel))
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:5500/jobs/${id}`)
      .then(
        setIsDeleteJob(!isDeleteJob)
      )
      .catch(function (error) {
        console.log(error);
      });
  }



  return (
    <div>
      <h2>Missions</h2>
      {
        isAddJob ?
          (<Form
            title="Ajouter une mission"
            buttonLabel="Valider"
            model={jobModel}
            onInputsChange={handleChange}
            onValidate={handleSubmit}
            data={newJob}
          />
          )
          :
          (
            <button onClick={handleAddJob}>Ajouter</button>
          )
      }
      <div className="jobs-cards cards">
        {jobs.map(job => (
          <Job job={job} key={job.id} deleteJob={handleDelete} />
        ))
        }
      </div>
    </div>
  );
}

export function Job({ job, deleteJob }) {

  return (
    <div className="job-card card">
      <h3>{job.label}</h3>
      <div className="job-card-body">
        <h4>{job.daily_rate} €</h4>
      </div>
      <div className="link-button">
        <Link className="edit-button" to={`/job/edit/${job.id}`}><FaEdit /></Link>
        <button onClick={() => deleteJob(job.id)} ><MdDeleteForever /></button>
      </div>
    </div>
  )
}
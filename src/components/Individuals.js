import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '.';
import { FaEdit } from 'react-icons/fa'
import { MdDeleteForever } from 'react-icons/md';


const individualModel = {
  "gender": "",
  "first_name": "",
  "last_name": "",
  "address": "",
  "zip_code": "",
  "city": "",
  "country": ""
}
export function Individuals() {
  const [individuals, setIndividuals] = useState([])
  const [isAddIndividual, setIsAddIndividual] = useState(false)
  const [isDeleteIndividual, setIsDeleteIndividual] = useState(false)
  const [newIndividual, setNewIndividual] = useState(individualModel)

  useEffect(() => {
    axios.get('http://127.0.0.1:5500/individuals')
      .then(res => res.data)
      .then(result => {
        setIndividuals(result)
      })
  }, [isAddIndividual, isDeleteIndividual])

  const handleAddIndividual = (e) => {
    e.preventDefault();
    console.log("handle addIndividual")
    setIsAddIndividual(true)
  }

  const handleChange = ({ target: { name, value } }) => {
    setNewIndividual({ ...newIndividual, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://127.0.0.1:5500/individuals', newIndividual)
      .then(setIsAddIndividual(false))
      .then(setNewIndividual(individualModel))
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleDelete = (id) => {
    axios.delete(`http://127.0.0.1:5500/individuals/${id}`)
      .then(
        setIsDeleteIndividual(!isDeleteIndividual)
      )
      .catch(function (error) {
        console.log(error);
      });
  }


  return (
    <div>
      <h2>Particuliers</h2>
      {
        isAddIndividual ?
          (<Form
            title="Ajouter un particulier"
            buttonLabel="Valider"
            model={individualModel}
            onInputsChange={handleChange}
            onValidate={handleSubmit}
            data={newIndividual}
          />
          )
          :
          (
            <button onClick={handleAddIndividual}>Ajouter</button>
          )
      }
      <div className="individual-cards cards">
        {individuals.map(individual => (
          <Individual individual={individual} key={individual.id} deleteIndividual={handleDelete} />
        ))
        }
      </div>
    </div>
  );
}

export function Individual({ individual, deleteIndividual }) {
  return (
    <div className="individual-card card">
      <h3>{nameFormatter(individual)}</h3>
      <div className="individual-adress">
        <div className="individual-adress-field">{individual.address}</div>
        <div className="individual-adress-field">{individual.zip_code}</div>
        <div className="individual-adress-field">{individual.city}</div>
        <div className="individual-adress-field">{individual.country}</div>
      </div>
      <div className="link-button">
        <Link className="edit-button" to={`/individual/edit/${individual.id}`}><FaEdit /></Link>
        <button onClick={() => deleteIndividual(individual.id)} ><MdDeleteForever /></button>
      </div>
    </div>
  )
}

const nameFormatter = (individual) => {
  return `${individual.first_name} ${individual.last_name}`;
}
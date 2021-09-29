import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, Redirect } from 'react-router-dom';
import { Form } from '.';
import { NotFound } from './NotFound';

const companyModel = {
  "name": '',
  "address": '',
  "zip_code": '',
  "city": '',
  "country": ''
}

const jobModel = {
  "label": "",
  "daily_rate": ""
}

export function Edit() {
  const { id, item } = useParams();
  const [newItem, setNewItem] = useState({})
  const [isUpdated, setIsUpdated] = useState(false)
  let model = item === "company" ? companyModel : jobModel

  useEffect(() => {
    axios.get(`http://127.0.0.1:5500/${urlFormater(item)}/${id}`)
      .then((response) => response.data)
      .then(res => {
        setNewItem(res)
        setIsUpdated(false)
      })
  }, [isUpdated])

  const handleChange = ({ target: { name, value } }) => {
    setNewItem({ ...newItem, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.patch(`http://127.0.0.1:5500/${urlFormater(item)}/${id}`, newItem)
      .then(() => {
        setNewItem(model)
      })
      .then(
        setIsUpdated(true) 
      )
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      
      {newItem.hasOwnProperty('id')  ?
        <Form
          title="Editer"
          buttonLabel="Editer"
          onInputsChange={handleChange}
          onValidate={handleSubmit}
          data={newItem}
          model={model}
        /> :
        <NotFound message="L'objet demander n'existe pas." />
      }
      {
        isUpdated && <Redirect to={`/${urlFormater(item)}`} />
      }
    </>
  )
}

const urlFormater = (item) => {
  let slug = "";
  switch (item) {
    case "company":
      slug = "companies";
      break;
    case "job":
      slug = "jobs";
      break;
  }
  return slug;
}
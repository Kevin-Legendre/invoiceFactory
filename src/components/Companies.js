import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { Link } from 'react-router-dom';

import { Form } from '.';

const companyModel = {
	"name": '',
	"address": '',
	"zip_code": '',
	"city": '',
	"country": ''
}

export function Companies() {

	const [companies, setCompanies] = useState([])
	const [isAddCompany, setIsAddCompany] = useState(false)
	const [isDeleteCompany, setIsDeleteCompany] = useState(false);
	const [newCompany, setNewCompany] = useState(companyModel)

	useEffect(() => {
		axios.get('http://127.0.0.1:5500/companies')
			.then(res => res.data)
			.then(result => {
				setCompanies(result)
			})
	}, [isAddCompany, isDeleteCompany])

	const handleAddCompany = (e) => {
		e.preventDefault();
		setIsAddCompany(true)
	}

	const handleChange = ({ target: { name, value } }) => {
		setNewCompany({ ...newCompany, [name]: value })
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		axios.post('http://127.0.0.1:5500/companies', newCompany)
			.then(setIsAddCompany(false))
			.then(setNewCompany(companyModel))
			.catch(function (error) {
				console.log(error);
			});
	}

	const handleDelete = (id) => {
		axios.delete(`http://127.0.0.1:5500/companies/${id}`)
			.then(
				setIsDeleteCompany(!isDeleteCompany)
			)
			.catch(function (error) {
				console.log(error);
			});
	}


	return (
		<div>
			<h2>Entreprises</h2>
			{
				isAddCompany ?
					(<Form
						title="Ajouter une entreprise"
						buttonLabel="Valider"
						model={companyModel}
						onInputsChange={handleChange}
						onValidate={handleSubmit}
						data={newCompany}
					/>
					)
					:
					(
						<button onClick={handleAddCompany}>Ajouter</button>
					)
			}
			<div className="companie-cards cards">
				{companies.map(company => (
					<Company company={company} key={company.id} deleteCompany={handleDelete} />
				))
				}
			</div>
		</div>
	);
}

export function Company({ company, deleteCompany }) {
	return (
		<div className="company-card card">
			<h3>{company.name}</h3>
			<div className="company-adress">
				<div className="company-adress-field">{company.address}</div>
				<div className="company-adress-field">{company.zip_code}</div>
				<div className="company-adress-field">{company.city}</div>
				<div className="company-adress-field">{company.country}</div>
			</div>
			<div className="link-button">
				<Link className="edit-button" to={`/company/edit/${company.id}`}><FaEdit /></Link>
				<button onClick={() => deleteCompany(company.id)} ><MdDeleteForever /></button>
			</div>
		</div>
	)
}
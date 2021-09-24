import axios from 'axios';
import React, { useEffect, useState } from 'react';

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
	const [newCompany, setNewCompany] = useState(companyModel)

	useEffect(() => {
		axios.get('http://127.0.0.1:5500/companies')
			.then(res => res.data)
			.then(result => {
				setCompanies(result)
			})
	}, [isAddCompany])

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
			.then(function (response) {
				console.log(response);
			})
			.then(setIsAddCompany(false))
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
					<Company company={company} key={company.id} />
				))
				}
			</div>
		</div>
	);
}

export function Company({ company }) {
	return (
		<div className="company-card card">
			<h3>{company.name}</h3>
			<div className="company-adress">
				<div className="company-adress-field">{company.address}</div>
				<div className="company-adress-field">{company.zip_code}</div>
				<div className="company-adress-field">{company.city}</div>
				<div className="company-adress-field">{company.country}</div>
			</div>
		</div>
	)
}
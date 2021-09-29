import React from 'react';

export function Form({ onInputsChange, onValidate, title, buttonLabel, data , model}) {
  return (
    <div className="form">
      <h3>{title}</h3>
      <form onSubmit={onValidate}>
        {Object.keys(model).map((key, index) => (<div className="form-group" key={index}>
          <label>{formatedLabel(key)}</label>
          <input type="text" name={key} value={data[key]} onChange={onInputsChange} className="form-control"/>
        </div>)
        )
        }
        <button className="btn">{buttonLabel}</button>
      </form >
    </div >
  )
}

const formatedLabel = (label) => {
  let labelFormated = label.replace("_", " ");
  return labelFormated[0].toUpperCase() + labelFormated.substr(1);
}
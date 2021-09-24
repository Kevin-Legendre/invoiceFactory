import React from "react";
import { Link } from 'react-router-dom'


export function Navbar() {
  return (
    <nav>
      <ul>
        <li className="nav-link">
          <Link to="/">Accueil</Link>
        </li>
        <li className="nav-link">
          <Link to="/companies">Entreprises</Link>
        </li>
        <li className="nav-link">
          <Link to="/individuals">Particuliers</Link>
        </li>
        <li className="nav-link">
          <Link to="/invoices">Factures</Link>
        </li>
        <li className="nav-link">
          <Link to="/jobs">Missions</Link>
        </li>
      </ul>
    </nav>
  );
}
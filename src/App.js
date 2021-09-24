import logo from './logo.svg';
import './App.css';
import { Companies, Home, Individuals, Invoices, Jobs, Navbar, Edit } from './components'
import { Route, Router, Switch } from 'react-router';

const ROUTES = [
  { path: '/', component: Home},
  { path: '/companies', component: Companies},
  { path: '/individuals', component: Individuals},
  { path: '/invoices', component: Invoices},
  { path: '/jobs', component: Jobs}
];

function App() {
  return (
    <Router>
      <div className="sidebar">
        <span className="logo">
          InvoiceFactory
        </span>
        <Navbar />
      </div>

      <main>
        <Switch>
          {
            ROUTES.map((item, i) => {
              if (item.component === Home) {
                return <Route key={i} exact path={item.path} component={item.component} />
              }
              return <Route key={i} path={item.path} component={item.component} />
            })
          }
          // <Route path='/edit/:id' component={Edit}/>
        </Switch>
      </main>
    </Router>
  );
}


export default App;

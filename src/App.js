import { Segment } from 'semantic-ui-react';
//import logo from './logo.svg';
import './App.css';
import Rotas from './Rotas';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer/>
        <Rotas />

<div style={{marginTop: '6%'}}>
  <Segment vertical color='grey' size='tiny' textAlign='center'>
    &copy; 2025 - Projeto PP2 - IFPE Jaboatão dos Guararapes
  </Segment>
</div>

    </div>
  );
}

export default App;

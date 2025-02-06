import React from 'react';
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from './views/util/ProtectedRoute';
import Home from './views/home/Home';
import FormLogin from './views/login/FormLogin';
import ListAgendamento from './views/agendamento/ListAgendamento';
import FormAgendamento from './views/agendamento/FormAgendamento';
import FormEspecialidade from './views/especialidade/FormEspecialidade';
import ListEspecialidade from './views/especialidade/ListEspecialidade';

function Rotas() {
    return (
        <>
            <Routes>
                <Route path="/" element={ <FormLogin/> } />

                <Route
                   path="/home"
                   element={
                   <ProtectedRoute>
                       <Home/>
                   </ProtectedRoute>
                   }
               />
                <Route path="/" element={ <Home/> } />

                <Route path="form-especialidade" element={ <FormEspecialidade/> } />
                <Route
                   path="/list-especialidade"
                   element={
                       <ProtectedRoute>
                           <ListEspecialidade />
                       </ProtectedRoute>
                   }
               />
               
                <Route path="list-agendamento" element={ <ListAgendamento/> } />
                <Route path="form-Agendamento" element={ <FormAgendamento/> } />
                
               
                
           
            </Routes>
        </>
    )
}

export default Rotas


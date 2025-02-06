import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { logout } from './views/util/AuthenticationService';


export default function MenuSistema(props) {

    return (
        <>
            <Menu inverted>

            <Menu.Item
                    className='navbar__item--mobile'
                    onClick={logout}
                    content='Sair'
                    as={Link}
                    to='/'
                />


                <Menu.Item
                    content='Home'
                    active={props.tela === 'home'}
                    as={Link}
                    to='/'
                />

                <Menu.Item
                    content='Especialidade'
                    active={props.tela === 'especialidade'}
                    as={Link}
                    to='/list-especialidade'
                />
              
                <Menu.Item
                    content='Agendamento'
                    active={props.tela === 'agendamento'}
                    as={Link}
                    to='/list-agendamento'
                />
                               
                 
            </Menu>
        </>
    )
}

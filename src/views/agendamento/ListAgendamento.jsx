import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table, Modal, Header } from 'semantic-ui-react';
import { notifyError, notifySuccess } from '../util/Util';
import MenuSistema from '../../MenuSistema';

export default function ListAgendamento() {

    const [lista, setLista] = useState([]);
    const [idRemover, setIdRemover] = useState();
    const [openModal, setOpenModal] = useState();

    useEffect(() => {
        carregarLista();
    }, [])

    function carregarLista() {

        axios.get("http://localhost:8080/api/agendamento")
            .then((response) => {
                setLista(response.data)
            })
    }

    function confirmaRemover(id) {
        setOpenModal(true)
        setIdRemover(id)
    }

    async function remover() {

        await axios.delete('http://localhost:8080/api/agendamento/' + idRemover)
        .then((response) => {
            notifySuccess('Agendamento removida com sucesso.');
            
            axios.get("http://localhost:8080/api/agendamento")
            .then((response) => {
                setLista(response.data);
            })
        })
        .catch((error) => {
            if (error.response.data.errors != undefined) {
                for (let i = 0; i < error.response.data.errors.length; i++) {
                notifyError(error.response.data.errors[i].defaultMessage)
                    }
                        } else {
                        notifyError(error.response.data.message)
                         }
        })
        setOpenModal(false);
    }

    return (
        <div>
            <MenuSistema tela={'Agendamento'} />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> Agendamento </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Button
                            label='Novo'
                            circular
                            color='blue'
                            icon='clipboard outline'
                            floated='right'
                            as={Link}
                            to='/form-agendamento'
                        />
                        <br /><br /><br />

                        <Table color='orange' sortable celled>

                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>idPaciente</Table.HeaderCell>
                                    <Table.HeaderCell>idMedico</Table.HeaderCell>
                                    <Table.HeaderCell>idEspecialidade</Table.HeaderCell>
                                    <Table.HeaderCell>data</Table.HeaderCell>
                                    <Table.HeaderCell>Horario</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>

                                {lista.map(agendamento => (

                                    <Table.Row key={agendamento.id}>
                                        <Table.Cell>{agendamento.idPaciente}</Table.Cell>
                                        <Table.Cell>{agendamento.idMedico}</Table.Cell>
                                        <Table.Cell>{agendamento.idEspecialide}</Table.Cell>
                                        <Table.Cell>{agendamento.dataAgendmento}</Table.Cell>
                                        <Table.Cell>{agendamento.horarioAgendamento}</Table.Cell>
                                        <Table.Cell textAlign='center'>

                                            <Button
                                                inverted
                                                circular
                                                color='green'
                                                title='Clique aqui para editar os dados dessa categoria'
                                                icon>
                                                <Link to="/form-agendamento" state={{ id: agendamento.id }} style={{ color: 'green' }}> <Icon name='edit' /> </Link>
                                            </Button>
                                            &nbsp;
                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Clique aqui para remover essa categoria'
                                                icon
                                                onClick={e => confirmaRemover(agendamento.id)}
                                                >
                                                <Icon name='trash' />

                                            </Button>

                                        </Table.Cell>
                                    </Table.Row>
                                ))}

                            </Table.Body>
                        </Table>
                    </div>
                </Container>
            </div>
            <Modal
                basic
                onClose={() => setOpenModal(false)}
                onOpen={() => setOpenModal(true)}
                open={openModal}
            >
                <Header icon>
                    <Icon name='trash' />
                    <div style={{ marginTop: '5%' }}> Tem certeza que deseja remover esse registro? </div>
                </Header>
                <Modal.Actions>
                    <Button basic color='red' inverted onClick={() => setOpenModal(false)}>
                        <Icon name='remove' /> Não
                    </Button>
                    <Button color='green' inverted onClick={() => remover()}>
                        <Icon name='checkmark' /> Sim
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    )
}
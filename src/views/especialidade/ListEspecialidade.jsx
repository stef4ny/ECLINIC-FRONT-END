import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table, Modal, Header } from 'semantic-ui-react';
import { notifyError, notifySuccess } from '../util/Util';
import MenuSistema from '../../MenuSistema';

export default function ListEspecialidade() {

    const [lista, setLista] = useState([]);
    const [idRemover, setIdRemover] = useState();
    const [openModal, setOpenModal] = useState();

    useEffect(() => {
        carregarLista();
    }, [])

    function carregarLista() {

        axios.get("http://localhost:8080/api/especialidade")
            .then((response) => {
                setLista(response.data)
            })
    }

    function confirmaRemover(id) {
        setOpenModal(true)
        setIdRemover(id)
    }

    async function remover() {

        await axios.delete('http://localhost:8080/api/especialidade/' + idRemover)
        .then((response) => {
            notifySuccess('Especialidade removida com sucesso.');
            
            axios.get("http://localhost:8080/api/especialidade")
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
            <MenuSistema tela={'especialidade'} />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> Especialidade </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Button
                            label='Novo'
                            circular
                            color='orange'
                            icon='clipboard outline'
                            floated='right'
                            as={Link}
                            to='/form-especialidade'
                        />
                        <br /><br /><br />

                        <Table color='orange' sortable celled>

                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Nome</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>

                                {lista.map(especialidade => (

                                    <Table.Row key={especialidade.id}>
                                        <Table.Cell>{especialidade.nome}</Table.Cell>
                                        <Table.Cell textAlign='center'>

                                            <Button
                                                inverted
                                                circular
                                                color='green'
                                                title='Clique aqui para editar os dados dessa categoria'
                                                icon>
                                                <Link to="/form-especialidade" state={{ id: especialidade.id }} style={{ color: 'green' }}> <Icon name='edit' /> </Link>
                                            </Button>
                                            &nbsp;
                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Clique aqui para remover essa categoria'
                                                icon
                                                onClick={e => confirmaRemover(especialidade.id)}
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
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Divider, Icon, Table, Modal, Header } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';

export default function ListVenda() {

    const [lista, setLista] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [modalObservacao, setModalObservacao] = useState (false);
    const [idRemoverVenda, setIdRemoverVenda] = useState();


    useEffect(() => {
        carregarLista();
    }, [])

    function carregarLista() {

        axios.get("http://localhost:8080/api/venda")
            .then((response) => {
                setLista(response.data)
            })
    }

    function confirmaRemover(id) {
        setOpenModal(true)
        setIdRemoverVenda(id)
    }

    function confirmaVisualizar(id) {
        setModalObservacao(id);
    }

    function formatarData(dataParam) {

        if (dataParam === null || dataParam === '' || dataParam === undefined) {
            return ''
        }

        let arrayData = dataParam.split('-');
        return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
    }

    async function remover() {

        await axios.delete('http://localhost:8080/api/venda/' + idRemoverVenda)
        .then((response) => {
            alert('Venda removida com sucesso.');
            console.log('Venda removida com sucesso.');
  
            axios.get("http://localhost:8080/api/venda")
            .then((response) => {
                setLista(response.data);
            })
        })
        .catch((error) => {
            alert('Erro ao remover uma venda.');
            console.log('Erro ao remover um venda.');
        })
        setOpenModal(false);
    }

    return (
        <div>
            <MenuSistema tela={'venda'} />
            <div style={{ marginTop: '3%' }}>

                <Container textAlign='justified' >

                    <h2> Venda </h2>
                    <Divider />

                    <div style={{ marginTop: '4%' }}>
                        <Button
                            label='Novo'
                            circular
                            color='orange'
                            icon='clipboard outline'
                            floated='right'
                            as={Link}
                            to='/form-venda'
                        />
                        <br /><br /><br />

                        <Table color='orange' sortable celled>

                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Cliente</Table.HeaderCell>
                                    <Table.HeaderCell>Produto</Table.HeaderCell>
                                    <Table.HeaderCell>Status da Venda</Table.HeaderCell>
                                    <Table.HeaderCell>Data da Venda</Table.HeaderCell>
                                    <Table.HeaderCell>Valor Total</Table.HeaderCell>
                                    <Table.HeaderCell>Retirada em Loja</Table.HeaderCell>
                                    <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>

                                {lista.map(venda => (

                                    <Table.Row key={venda.id}>
                                        <Table.Cell>{venda.cliente}</Table.Cell>
                                        <Table.Cell>{venda.produto}</Table.Cell>
                                        <Table.Cell>{venda.statusVenda}</Table.Cell>
                                        <Table.Cell>{formatarData(venda.dataVenda)}</Table.Cell>
                                        <Table.Cell>{venda.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Table.Cell>
                                        <Table.Cell>{venda.retiradaEmLoja ? "Sim" : "Não"}</Table.Cell>
                                        <Table.Cell textAlign='center'>

                                            {/* <Button
                                                inverted
                                                circular
                                                color='green'
                                                title='Clique aqui para editar os dados deste cliente'
                                                icon>
                                                <Link to="/form-venda" state={{ id: cliente.id }} style={{ color: 'green' }}> <Icon name='edit' /> </Link>
                                            </Button> */}
                                            &nbsp;
                                            <Button
                                                inverted
                                                circular
                                                color='red'
                                                title='Clique aqui para remover esta Venda'
                                                icon
                                                onClick={e => confirmaRemover(venda.id)}>
                                                <Icon name='trash' />
                                            </Button>
                                            <Button
                                                inverted
                                                circular
                                                color='blue'
                                                title='Clique aqui para visualizar as observações'
                                                icon
                                                onClick={e => confirmaVisualizar(venda)}>
                                                <Icon name='eye' />
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

            <Modal
                basic
                onClose={() => setModalObservacao(false)}
                onOpen={() => setModalObservacao(true)}
                open={modalObservacao}
            >
                <Modal.Actions>
                    
                <Table color='orange' sortable celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell textAlign = "center"> Observações</Table.HeaderCell>
                            
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Cell textAlign = "center">{modalObservacao.observacao}</Table.Cell>  

                    </Table.Body>
                </Table>
                </Modal.Actions>
            </Modal>
        </div>
    )
}

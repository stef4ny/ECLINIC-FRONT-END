import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import InputMask from "react-input-mask";
import {
  Button,
  Container,
  Divider,
  Form,
  Icon,
  Dropdown,
  Radio,
} from "semantic-ui-react";
import { notifyError, notifySuccess } from "../../views/util/Util";
import MenuSistema from "../../MenuSistema";

export default function FormVenda() {
  // const { state } = useLocation();
  // const [idVenda, setIdVenda] = useState();
  const [cliente, setCliente] = useState();
  const [produto, setProduto] = useState();
  const [dataVenda, setDataVenda] = useState();
  const [retiradaEmLoja, setRetiradaEmLoja] = useState();
  const handleChangeRadio = (e, { value }) => {
    setRetiradaEmLoja(value);
  };
  const venda = [
    {
      key: "Pedido Cancelado",
      text: "Pedido Cancelado",
      value: "Pedido Cancelado",
    },
    {
      key: "Aguardando Pagamento",
      text: "Aguardando Pagamento",
      value: "Aguardando Pagamento",
    },
    { key: "Pago", text: "Pago", value: "Pago" },
    { key: "Entregue", text: "Entregue", value: "Entregue" },
  ];
  const [statusVenda, setStatusVenda] = useState();
  const handleChange = (e, { value }) => {
    setStatusVenda(value);
  };
  const [valorTotal, setValorTotal] = useState();
  const [observacao, setObservacao] = useState();

  // useEffect(() => {
  //     if (state != null && state.id != null) {
  //         axios.get("http://localhost:8080/api/venda/" + state.id)
  //             .then((response) => {
  //                 setIdCliente(response.data.id)
  //                 setNome(response.data.nome)
  //                 setCpf(response.data.cpf)
  //                 setDataNascimento(formatarData(response.data.dataNascimento))
  //                 setFoneCelular(response.data.foneCelular)
  //                 setFoneFixo(response.data.foneFixo)
  //             })
  //     }
  // }, [state])

  // function formatarData(dataParam) {

  //     if (dataParam === null || dataParam === '' || dataParam === undefined) {
  //         return ''
  //     }

  //     let arrayData = dataParam.split('-');
  //     return arrayData[2] + '/' + arrayData[1] + '/' + arrayData[0];
  // }

  function salvar() {
    let vendaRequest = {
      cliente: cliente,
      produto: produto,
      statusVenda: statusVenda,
      dataVenda: dataVenda,
      valorTotal: valorTotal,
      observacao: observacao,
      retiradaEmLoja: retiradaEmLoja,
    };

    // if (idCliente != null) { //Alteração:
    //     axios.put("http://localhost:8080/api/venda/" + idCliente, vendaRequest)
    //         .then((response) => {
    //             alert('Venda alterada com sucesso.');
    //             console.log('Venda alterada com sucesso.') ;
    //         })
    //         .catch((error) => {
    //             alert('Erro ao alterar uma venda.');
    //             console.log('Erro ao alterar uma venda.');
    //         })
    // } else { //Cadastro:
    axios
      .post("http://localhost:8080/api/venda", vendaRequest)
      .then((response) => {
        notifySuccess("Venda cadastrada com sucesso.");
      })
      .catch((error) => {
        if (error.response.data.errors != undefined) {
          for (let i = 0; i < error.response.data.errors.length; i++) {
            notifyError(error.response.data.errors[i].defaultMessage);
          }
        } else {
          notifyError(error.response.data.message);
        }
      });
    //}
  }

  return (
    <div>
      <MenuSistema tela={"venda"} />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
         
          <h2>
            {" "}
            <span style={{ color: "darkgray" }}>
              {" "}
              Venda &nbsp;
              <Icon name="angle double right" size="small" />{" "}
            </span>{" "}
            Cadastro
          </h2>
         

          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  fluid
                  label="Cliente"
                  maxLength="100"
                  value={cliente}
                  onChange={(e) => setCliente(e.target.value)}
                />

                <Form.Input
                  fluid
                  label="Produto"
                  maxLength="100"
                  value={produto}
                  onChange={(e) => setProduto(e.target.value)}
                />
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Input fluid label="Status da Venda">
                  <Dropdown
                    placeholder="Selecione"
                    fluid
                    selection
                    options={venda}
                    value={statusVenda}
                    onChange={handleChange}
                  />
                </Form.Input>
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input fluid label="Data da venda" width={6}>
                  <InputMask
                    mask="99/99/9999"
                    maskChar={null}
                    placeholder="Ex: 20/03/1985"
                    value={dataVenda}
                    onChange={(e) => setDataVenda(e.target.value)}
                  />
                </Form.Input>

                <Form.Input
                  fluid
                  label="Valor Total"
                  value={valorTotal}
                  onChange={(e) => setValorTotal(e.target.value)}
                />

                <Form.Input
                  fluid
                  label="Observação"
                  value={observacao}
                  onChange={(e) => setObservacao(e.target.value)}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Field>
                  <label>Retirada em loja:</label>
                  <Radio
                    label="Sim"
                    name="radioGroup"
                    value={true}
                    checked={retiradaEmLoja === true}
                    onChange={handleChangeRadio}
                  />
                  &nbsp;&nbsp;
                  <Radio
                    label="Não"
                    name="radioGroup"
                    value={false}
                    checked={retiradaEmLoja === false}
                    onChange={handleChangeRadio}
                  />
                </Form.Field>
              </Form.Group>
            </Form>

            <div style={{ marginTop: "4%" }}>
              <Button
                type="button"
                inverted
                circular
                icon
                labelPosition="left"
                color="orange"
              >
                <Icon name="reply" />
                <Link to={"/list-venda"}>Voltar</Link>
              </Button>

              <Button
                inverted
                circular
                icon
                labelPosition="left"
                color="blue"
                floated="right"
                disabled={
                  !cliente ||
                  !produto ||
                  !dataVenda ||
                  !statusVenda ||
                  !valorTotal ||
                  !observacao
                }
                onClick={() => salvar()}
              >
                <Icon name="save" />
                Salvar
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
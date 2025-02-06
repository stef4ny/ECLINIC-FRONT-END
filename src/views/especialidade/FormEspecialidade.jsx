import React, { useEffect, useState } from "act";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import { notifyError, notifySuccess } from "../util/Util";
import MenuSistema from "../../MenuSistema";

export default function FormEspecialidade() {
  const { state } = useLocation();
  const [nome, setNome] = useState();
  const [idEspecialidade, setIdEspecialidade] = useState();

  useEffect(() => {
    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8080/api/especialidade/" + state.id)
        .then((response) => {
          setIdEspecialidade(response.data.id);
          setNome(response.data.descricao);
        });
    }
  }, [state]);

  function salvar() {
    let especialidadeRequest = {
      idEspecialidade: idEspecialidade,
      nome: nome
    };

    if (idEspecialidade != null) {
      //Alteração:
      axios
        .put(
          "http://localhost:8080/api/especialidade/" + idEspecialidade,
          especialidadeRequest
        )
        .then((response) => {
          notifySuccess("Especialidade alterada com sucesso.");
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
    } else {
      //Cadastro:
      axios
        .post(
          "http://localhost:8080/api/especialidade",
          especialidadeRequest
        )
        .then((response) => {
          notifySuccess("Especialidade cadastrada com sucesso.");
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
    }
  }
  return (
    <div>
      <MenuSistema tela={"Especialidade"} />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idEspecialidade === undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
               Especialidade &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Cadastro
            </h2>
          )}
          {idEspecialidade != undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Especialidade &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Alteração
            </h2>
          )}

          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="Nome"
                  maxLength="100"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
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
                <Link to={"/list-categoriaproduto"}>Voltar</Link>
              </Button>

              <Button
                inverted
                circular
                icon
                labelPosition="left"
                color="blue"
                floated="right"
                disabled={!nome}
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
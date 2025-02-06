import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { Button, Container, Divider, Form, Icon, Select } from "semantic-ui-react"; // Corrigido import do Select
import { notifyError, notifySuccess } from "../util/Util";
import MenuSistema from "../../MenuSistema";

export default function FormAgendamento() {
  const { state } = useLocation();
  const [idAgendamento, setIdAgendamento] = useState();
  const [idPaciente, setIdPaciente] = useState();
  const [idMedico, setIdMedico] = useState();
  const [idEspecialidade, setIdEspecialidade] = useState();
  const [dataAgendmento, setDataAgendmento] = useState();
  const [horarioAgendamento, setHorarioAgendamento] = useState();
  const [listaMedico, setListaMedico] = useState([]); // Correção para definição de listaMedico
  const [especialidades, setEspecialidades] = useState([]);

  useEffect(() => {
    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8080/api/agendamento/" + state.id)
        .then((response) => {
          setIdAgendamento(response.data.id);
          setIdPaciente(response.data.idPaciente); // Corrigido para o campo correto
          setIdMedico(response.data.idMedico); // Corrigido para o campo correto
          setIdEspecialidade(response.data.idEspecialidade); // Corrigido para o campo correto
          setDataAgendmento(response.data.dataAgendamento); // Corrigido para o campo correto
          setHorarioAgendamento(response.data.horarioAgendamento); // Corrigido para o campo correto
        });
    }

    axios.get("http://localhost:8080/api/especialidade").then((response) => {
      const dropDownEspecialidades = response.data.map((c) => ({
        text: c.nome,
        value: c.id,
      }));
      setEspecialidades(dropDownEspecialidades); // Correção na atualização das especialidades
    });

    axios.get("http://localhost:8080/api/medicos").then((response) => { // Supondo que a lista de médicos vem de uma API
      const dropDownMedicos = response.data.map((m) => ({
        text: m.nome,
        value: m.id,
      }));
      setListaMedico(dropDownMedicos);
    });

  }, [state]);

  function salvar() {
    let agendamentoRequest = {
      idAgendamento: idAgendamento,
      idPaciente: idPaciente,
      idMedico: idMedico,
      idEspecialidade: idEspecialidade,
      dataAgendamento: dataAgendmento, // Corrigido para o campo correto
      horarioAgendamento: horarioAgendamento, // Corrigido para o campo correto
    };

    if (idAgendamento != null) {
      // Alteração:
      axios
        .put(
          "http://localhost:8080/api/agendamento/" + idAgendamento,
          agendamentoRequest
        )
        .then((response) => {
          notifySuccess("Agendamento alterado com sucesso.");
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
      // Cadastro:
      axios
        .post("http://localhost:8080/api/agendamento", agendamentoRequest)
        .then((response) => {
          notifySuccess("Agendamento cadastrado com sucesso.");
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
      <MenuSistema tela={"Agendamento"} />

      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idAgendamento === undefined && (
            <h2>
              <span style={{ color: "darkgray" }}>
                Agendamento &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Agendamento
            </h2>
          )}
          {idAgendamento !== undefined && (
            <h2>
              <span style={{ color: "darkgray" }}>
                Agendamento &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Alteração
            </h2>
          )}

          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group widths={"equal"}>
                <Form.Select
                  required
                  fluid
                  tabIndex="3"
                  placeholder="Selecione"
                  label="Paciente"
                  options={idPaciente} // Corrigido para o valor adequado
                  value={idPaciente}
                  onChange={(e, { value }) => {
                    setIdPaciente(value);
                  }}
                />
              </Form.Group>

              <Form.Group widths={"equal"}>
                <Form.Select
                  required
                  fluid
                  tabIndex="3"
                  placeholder="Selecione"
                  label="Médico"
                  options={listaMedico}
                  value={idMedico}
                  onChange={(e, { value }) => {
                    setIdMedico(value);
                  }}
                />
              </Form.Group>

              <Form.Group widths={"equal"}>
                <Form.Select
                  required
                  fluid
                  tabIndex="3"
                  placeholder="Selecione"
                  label="Especialidade"
                  options={especialidades} // Corrigido para o valor adequado
                  value={idEspecialidade}
                  onChange={(e, { value }) => {
                    setIdEspecialidade(value);
                  }}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="Data Agendamento"
                  maxLength="100"
                  value={dataAgendmento}
                  onChange={(e) => setDataAgendmento(e.target.value)}
                />
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="Horário Agendamento"
                  maxLength="100"
                  value={horarioAgendamento}
                  onChange={(e) => setHorarioAgendamento(e.target.value)}
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
                color="blue"
              >
                <Icon name="reply" />
                <Link to={"/list-agendamento"}>Voltar</Link>
              </Button>

              <Button
                inverted
                circular
                icon
                labelPosition="left"
                color="blue"
                floated="right"
                disabled={
                  !idPaciente ||
                  !idMedico ||
                  !idEspecialidade ||
                  !dataAgendmento ||
                  !horarioAgendamento
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


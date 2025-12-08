import { useState, useEffect } from "react";
import styled from "styled-components";
import { apiGeo } from "../../services/api";
import { IoTrash, IoAdd } from "react-icons/io5";

const Container = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;
const Title = styled.h2`
  color: #1b5e20;
  font-size: 20px;
`;
const AddButton = styled.button`
  background-color: #2e7d32;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  &:hover {
    background-color: #1b5e20;
  }
`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  th {
    text-align: left;
    padding: 12px;
    border-bottom: 2px solid #eee;
    color: #666;
  }
  td {
    padding: 12px;
    border-bottom: 1px solid #eee;
    color: #333;
  }
`;
const ActionButton = styled.button`
  background: none;
  border: none;
  color: #d9534f;
  cursor: pointer;
  font-size: 18px;
  &:hover {
    opacity: 0.7;
  }
`;
const FormContainer = styled.div`
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 24px;
  border: 1px solid #eee;
`;
const FormGroup = styled.div`
  margin-bottom: 16px;
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
    color: #555;
  }
  input,
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
  }
`;
const FormActions = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;
const CancelButton = styled.button`
  background: #ccc;
  color: #333;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
`;
const SaveButton = styled.button`
  background: #2e7d32;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
`;

interface Zona {
  id_zona: number;
  nome: string;
  descricao: string;
  meta_arvores: number;
}

export default function ZonasAdmin() {
  const [zonas, setZonas] = useState<Zona[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [meta, setMeta] = useState("");

  useEffect(() => {
    fetchZonas();
  }, []);

  const fetchZonas = async () => {
    try {
      const response = await apiGeo.get<Zona[]>("/zonas");
      setZonas(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Excluir esta zona?")) return;
    try {
      await apiGeo.delete(`/zonas/${id}`);
      setZonas(zonas.filter((z) => z.id_zona !== id));
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir.");
    }
  };

  const handleSave = async () => {
    if (!nome || !meta) {
      alert("Preencha os campos!");
      return;
    }
    try {
      const novaZona = { nome, descricao, meta_arvores: Number(meta) };
      const response = await apiGeo.post("/zonas", novaZona);
      setZonas([...zonas, response.data]);
      setNome("");
      setDescricao("");
      setMeta("");
      setShowForm(false);
    } catch (error) {
      console.error(error);
      alert("Erro ao criar zona.");
    }
  };

  return (
    <Container>
      <Header>
        <Title>Gerenciar Zonas de Plantio</Title>
        {!showForm && (
          <AddButton onClick={() => setShowForm(true)}>
            <IoAdd size={20} /> Nova Zona
          </AddButton>
        )}
      </Header>

      {showForm && (
        <FormContainer>
          <h3>Nova Zona</h3>
          <FormGroup>
            <label>Nome da Zona</label>
            <input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Parque da Cidade"
            />
          </FormGroup>
          <FormGroup>
            <label>Meta de Árvores</label>
            <input
              type="number"
              value={meta}
              onChange={(e) => setMeta(e.target.value)}
              placeholder="100"
            />
          </FormGroup>
          <FormGroup>
            <label>Descrição</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Detalhes sobre a área..."
            />
          </FormGroup>
          <FormActions>
            <CancelButton onClick={() => setShowForm(false)}>
              Cancelar
            </CancelButton>
            <SaveButton onClick={handleSave}>Salvar Zona</SaveButton>
          </FormActions>
        </FormContainer>
      )}

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Meta</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {zonas.map((z) => (
              <tr key={z.id_zona}>
                <td>#{z.id_zona}</td>
                <td>
                  <strong>{z.nome}</strong>
                  <br />
                  <small>{z.descricao}</small>
                </td>
                <td>{z.meta_arvores} árvores</td>
                <td>
                  <ActionButton onClick={() => handleDelete(z.id_zona)}>
                    <IoTrash />
                  </ActionButton>
                </td>
              </tr>
            ))}
            {zonas.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  style={{ textAlign: "center", padding: "30px" }}
                >
                  Nenhuma zona cadastrada.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

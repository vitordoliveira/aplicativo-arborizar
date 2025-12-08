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

interface Especie {
  id_especie: number;
  nome_popular: string;
  nome_cientifico: string;
  descricao: string;
}

export default function EspeciesAdmin() {
  const [especies, setEspecies] = useState<Especie[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [nomePopular, setNomePopular] = useState("");
  const [nomeCientifico, setNomeCientifico] = useState("");
  const [descricao, setDescricao] = useState("");

  // 1. Carregar Espécies
  useEffect(() => {
    fetchEspecies();
  }, []);

  const fetchEspecies = async () => {
    try {
      const response = await apiGeo.get<Especie[]>("/especies");
      setEspecies(response.data);
    } catch (error) {
      console.error("Erro ao buscar espécies:", error);
      alert("Erro ao carregar espécies.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Deletar Espécie
  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir esta espécie?")) return;

    try {
      await apiGeo.delete(`/especies/${id}`);
      setEspecies(especies.filter((e) => e.id_especie !== id));
      alert("Espécie excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar:", error);
      alert("Erro ao excluir espécie.");
    }
  };

  // 3. Criar Espécie
  const handleSave = async () => {
    if (!nomePopular || !nomeCientifico || !descricao) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const novaEspecie = {
        nome_popular: nomePopular,
        nome_cientifico: nomeCientifico,
        descricao,
      };

      const response = await apiGeo.post("/especies", novaEspecie);

      setEspecies([...especies, response.data]);

      setNomePopular("");
      setNomeCientifico("");
      setDescricao("");
      setShowForm(false);
      alert("Espécie cadastrada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar:", error);
      alert("Erro ao cadastrar espécie.");
    }
  };

  return (
    <Container>
      <Header>
        <Title>Catálogo de Espécies</Title>
        {!showForm && (
          <AddButton onClick={() => setShowForm(true)}>
            <IoAdd size={20} /> Nova Espécie
          </AddButton>
        )}
      </Header>

      {/* --- Formulário --- */}
      {showForm && (
        <FormContainer>
          <h3>Cadastrar Nova Árvore</h3>
          <div style={{ display: "flex", gap: "16px" }}>
            <FormGroup style={{ flex: 1 }}>
              <label>Nome Popular</label>
              <input
                value={nomePopular}
                onChange={(e) => setNomePopular(e.target.value)}
                placeholder="Ex: Ipê Amarelo"
              />
            </FormGroup>
            <FormGroup style={{ flex: 1 }}>
              <label>Nome Científico</label>
              <input
                value={nomeCientifico}
                onChange={(e) => setNomeCientifico(e.target.value)}
                placeholder="Ex: Handroanthus albus"
                style={{ fontStyle: "italic" }}
              />
            </FormGroup>
          </div>
          <FormGroup>
            <label>Descrição</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Características da árvore..."
              rows={3}
            />
          </FormGroup>
          <FormActions>
            <CancelButton onClick={() => setShowForm(false)}>
              Cancelar
            </CancelButton>
            <SaveButton onClick={handleSave}>Salvar Espécie</SaveButton>
          </FormActions>
        </FormContainer>
      )}

      {/* --- Tabela --- */}
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome Popular</th>
              <th>Nome Científico</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {especies.map((esp) => (
              <tr key={esp.id_especie}>
                <td>#{esp.id_especie}</td>
                <td>
                  <strong>{esp.nome_popular}</strong>
                </td>
                <td>
                  <i>{esp.nome_cientifico}</i>
                </td>
                <td>
                  <ActionButton onClick={() => handleDelete(esp.id_especie)}>
                    <IoTrash />
                  </ActionButton>
                </td>
              </tr>
            ))}
            {especies.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  style={{ textAlign: "center", padding: "30px" }}
                >
                  Nenhuma espécie cadastrada.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

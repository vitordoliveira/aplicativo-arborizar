import { useState, useEffect } from "react";
import styled from "styled-components";
import { apiGamification } from "../../services/api";
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

interface Insignia {
  id_insignia: number;
  nome: string;
  descricao: string;
  imagem_url: string;
}

export default function InsigniasAdmin() {
  const [insignias, setInsignias] = useState<Insignia[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");

  // 1. Carregar
  useEffect(() => {
    fetchInsignias();
  }, []);

  const fetchInsignias = async () => {
    try {
      const response = await apiGamification.get<Insignia[]>("/insignias");
      setInsignias(response.data);
    } catch (error) {
      console.error("Erro ao buscar insígnias:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Deletar
  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir esta insígnia?")) return;
    try {
      await apiGamification.delete(`/insignias/${id}`);
      setInsignias(insignias.filter((i) => i.id_insignia !== id));
      alert("Insígnia excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar:", error);
      alert("Erro ao excluir insígnia.");
    }
  };

  // 3. Criar
  const handleSave = async () => {
    if (!nome || !descricao || !imagemUrl) {
      alert("Preencha todos os campos!");
      return;
    }
    try {
      const novaInsignia = { nome, descricao, imagem_url: imagemUrl };
      const response = await apiGamification.post("/insignias", novaInsignia);
      setInsignias([...insignias, response.data]);
      setNome("");
      setDescricao("");
      setImagemUrl("");
      setShowForm(false);
      alert("Insígnia criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar:", error);
      alert("Erro ao criar insígnia.");
    }
  };

  return (
    <Container>
      <Header>
        <Title>Gerenciar Insígnias</Title>
        {!showForm && (
          <AddButton onClick={() => setShowForm(true)}>
            <IoAdd size={20} /> Nova Insígnia
          </AddButton>
        )}
      </Header>

      {/* --- Formulário --- */}
      {showForm && (
        <FormContainer>
          <h3>Nova Insígnia</h3>
          <div style={{ display: "flex", gap: "16px" }}>
            <FormGroup style={{ flex: 1 }}>
              <label>Nome</label>
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Protetor das Águas"
              />
            </FormGroup>
            <FormGroup style={{ flex: 1 }}>
              <label>URL da Imagem (Ícone)</label>
              <input
                value={imagemUrl}
                onChange={(e) => setImagemUrl(e.target.value)}
                placeholder="https://..."
              />
            </FormGroup>
          </div>
          <FormGroup>
            <label>Descrição</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Como ganhar esta medalha..."
            />
          </FormGroup>
          <FormActions>
            <CancelButton onClick={() => setShowForm(false)}>
              Cancelar
            </CancelButton>
            <SaveButton onClick={handleSave}>Salvar Insígnia</SaveButton>
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
              <th>Ícone</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {insignias.map((ins) => (
              <tr key={ins.id_insignia}>
                <td>#{ins.id_insignia}</td>
                <td>
                  <img
                    src={ins.imagem_url}
                    alt={ins.nome}
                    style={{
                      width: "40px",
                      height: "40px",
                      objectFit: "contain",
                    }}
                    onError={(e) => (e.currentTarget.style.display = "none")}
                  />
                </td>
                <td>
                  <strong>{ins.nome}</strong>
                </td>
                <td style={{ color: "#666" }}>{ins.descricao}</td>
                <td>
                  <ActionButton onClick={() => handleDelete(ins.id_insignia)}>
                    <IoTrash />
                  </ActionButton>
                </td>
              </tr>
            ))}
            {insignias.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  style={{ textAlign: "center", padding: "30px" }}
                >
                  Nenhuma insígnia cadastrada.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

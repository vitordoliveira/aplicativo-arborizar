import { useState, useEffect } from "react";
import styled from "styled-components";
import { apiGamification } from "../../services/api";
import { IoTrash, IoAdd } from "react-icons/io5";

// --- Estilos ---
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

// --- Estilos do Formulário ---
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

interface Missao {
  id_missao: number;
  titulo: string;
  descricao: string;
  pontos_recompensa: number;
  xp_recompensa: number;
}

export default function MissoesAdmin() {
  const [missoes, setMissoes] = useState<Missao[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  // Estados do Formulário
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [pontos, setPontos] = useState("");
  const [xp, setXp] = useState("");

  // 1. Carregar Missões
  useEffect(() => {
    fetchMissoes();
  }, []);

  const fetchMissoes = async () => {
    try {
      const response = await apiGamification.get<Missao[]>("/missoes");
      setMissoes(response.data);
    } catch (error) {
      console.error("Erro ao buscar missões:", error);
      alert("Erro ao carregar missões.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Deletar Missão
  const handleDelete = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir esta missão?")) return;

    try {
      await apiGamification.delete(`/missoes/${id}`);
      // Remove da lista localmente para não precisar recarregar tudo
      setMissoes(missoes.filter((m) => m.id_missao !== id));
      alert("Missão excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar:", error);
      alert("Erro ao excluir missão. Verifique suas permissões de Admin.");
    }
  };

  // 3. Criar Missão
  const handleSave = async () => {
    if (!titulo || !descricao || !pontos || !xp) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const novaMissao = {
        titulo,
        descricao,
        pontos_recompensa: Number(pontos),
        xp_recompensa: Number(xp),
      };

      const response = await apiGamification.post("/missoes", novaMissao);

      // Adiciona a nova missão à lista
      setMissoes([...missoes, response.data]);

      // Limpa e fecha o formulário
      setTitulo("");
      setDescricao("");
      setPontos("");
      setXp("");
      setShowForm(false);
      alert("Missão criada com sucesso!");
    } catch (error) {
      console.error("Erro ao criar:", error);
      alert("Erro ao criar missão.");
    }
  };

  return (
    <Container>
      <Header>
        <Title>Gerenciar Missões</Title>
        {!showForm && (
          <AddButton onClick={() => setShowForm(true)}>
            <IoAdd size={20} /> Nova Missão
          </AddButton>
        )}
      </Header>

      {/* --- Formulário de Criação --- */}
      {showForm && (
        <FormContainer>
          <h3>Nova Missão</h3>
          <FormGroup>
            <label>Título</label>
            <input
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ex: Plantador Iniciante"
            />
          </FormGroup>
          <FormGroup>
            <label>Descrição</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descrição da tarefa..."
            />
          </FormGroup>
          <div style={{ display: "flex", gap: "16px" }}>
            <FormGroup style={{ flex: 1 }}>
              <label>Pontos</label>
              <input
                type="number"
                value={pontos}
                onChange={(e) => setPontos(e.target.value)}
                placeholder="100"
              />
            </FormGroup>
            <FormGroup style={{ flex: 1 }}>
              <label>XP</label>
              <input
                type="number"
                value={xp}
                onChange={(e) => setXp(e.target.value)}
                placeholder="50"
              />
            </FormGroup>
          </div>
          <FormActions>
            <CancelButton onClick={() => setShowForm(false)}>
              Cancelar
            </CancelButton>
            <SaveButton onClick={handleSave}>Salvar Missão</SaveButton>
          </FormActions>
        </FormContainer>
      )}

      {/* --- Tabela de Listagem --- */}
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Recompensa</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {missoes.map((missao) => (
              <tr key={missao.id_missao}>
                <td>#{missao.id_missao}</td>
                <td>
                  <strong>{missao.titulo}</strong>
                  <br />
                  <small style={{ color: "#777" }}>{missao.descricao}</small>
                </td>
                <td>
                  <span style={{ color: "#E65100", fontWeight: "bold" }}>
                    {missao.pontos_recompensa} pts
                  </span>{" "}
                  / {missao.xp_recompensa} XP
                </td>
                <td>
                  <ActionButton onClick={() => handleDelete(missao.id_missao)}>
                    <IoTrash />
                  </ActionButton>
                </td>
              </tr>
            ))}
            {missoes.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  style={{ textAlign: "center", padding: "30px" }}
                >
                  Nenhuma missão cadastrada.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

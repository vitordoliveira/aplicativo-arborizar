import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  IoHomeOutline,
  IoRibbonOutline,
  IoMapOutline,
  IoBarChartOutline,
  IoPersonOutline,
} from "react-icons/io5";

const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px; /* Altura da barra de navegação */
  background-color: #ffffff;
  border-top: 1px solid #eeeeee;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
`;

const NavItem = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #999; /* Cor do ícone inativo */
  font-size: 10px;

  /* Estilo do ícone */
  svg {
    font-size: 24px;
    margin-bottom: 4px;
  }

  /* Quando o link estiver ATIVO, muda a cor */
  &.active {
    color: #6a8b49; /* Nosso Verde Arborizar */
  }
`;

export default function TabBar() {
  return (
    <NavContainer>
      <NavItem to="/inicio">
        <IoHomeOutline />
        {"Início"}
      </NavItem>
      <NavItem to="/missoes">
        <IoRibbonOutline />
        {"Missões"}
      </NavItem>
      <NavItem to="/mapa">
        <IoMapOutline />
        {"Mapa"}
      </NavItem>
      <NavItem to="/ranking">
        <IoBarChartOutline />
        {"Ranking"}
      </NavItem>
      <NavItem to="/perfil">
        <IoPersonOutline />
        {"Perfil"}
      </NavItem>
    </NavContainer>
  );
}

import { Outlet } from "react-router-dom";
import styled from "styled-components";
import TabBar from "./TabBar.tsx";

const PageContainer = styled.div`
  padding-bottom: 80px;
`;

export default function MainLayout() {
  return (
    <div>
      <PageContainer>
        <Outlet />
      </PageContainer>

      <TabBar />
    </div>
  );
}

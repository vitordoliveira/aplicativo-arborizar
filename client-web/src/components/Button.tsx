import type { ButtonHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  width: 100%;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  color: #ffffff;
  background-color: #6a8b49;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
  &:disabled {
    background-color: #a9a9a9;
    cursor: not-allowed;
  }
`;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({ children, ...props }: ButtonProps) {
  return <StyledButton {...props}>{children}</StyledButton>;
}

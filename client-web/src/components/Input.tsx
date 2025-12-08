import type { InputHTMLAttributes } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  padding: 16px;
  font-size: 16px;
  margin-bottom: 12px;
  border: 1px solid #d1d1d1;
  border-radius: 12px;
  background-color: #f8f8f8;

  &::placeholder {
    color: #999;
  }
`;

export default function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <StyledInput {...props} />;
}

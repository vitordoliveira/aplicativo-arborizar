import { useState } from "react";
import styled from "styled-components";

const SwitchContainer = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const Input = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${Slider} {
    background-color: #6a8b49; /* Verde Arborizar */
  }

  &:checked + ${Slider}:before {
    transform: translateX(22px);
  }
`;

export default function ToggleSwitch() {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <SwitchContainer>
      <Input
        type="checkbox"
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
      />
      <Slider />
    </SwitchContainer>
  );
}

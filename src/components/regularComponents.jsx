import styled from "styled-components";

export const Separador = styled.div`
  background-color: ${({ backgroundColor }) =>
    backgroundColor || "rgb(255, 85, 85)"};
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "5px"};
  border-radius: 5px;
  margin: 20px;
`;

export const SeparadorFino = styled.div`
  background-color: ${({ backgroundColor }) =>
    backgroundColor || "rgb(255, 85, 85)"};
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "2px"};
  border-radius: 5px;
`;

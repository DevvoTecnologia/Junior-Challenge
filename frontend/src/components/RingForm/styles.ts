import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  border: 1px solid #dcdcdc;
  gap: 12px;
  padding-top: 70px;
  outline: 1px solid red;
`;

export const FormControl = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 4px;

  label {
    font-weight: bold;
  }

  input {
    height: 30px;
    padding: 8px;
  }

  select {
    padding: 5px;
  }
`;

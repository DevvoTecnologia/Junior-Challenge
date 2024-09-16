import styled from "styled-components";

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  max-width: 600px;
  width: 100%;
  padding: 30px;
  margin: 50px auto;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;

  gap: 40px;
  margin-bottom: 20px;

  width: 100%;

  > h1 {
    font-size: 28px;
    color: #2c3e50;
  }
`;

export const BackButton = styled.button`
  color: #3498db;

  &:hover {
    color: #2980b9;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

export const ErrorText = styled.p`
  color: #e74c3c;
  font-size: 14px;
  margin-top: 5px;
`;

export const Icon = styled.div`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #3498db;
  font-size: 22px;
`;

export const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 12px 40px;
  border: 1px solid #bdc3c7;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s, box-shadow 0.3s;

  &:focus {
    border-color: #3498db;
    box-shadow: 0 0 8px rgba(52, 152, 219, 0.3);
    outline: none;
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 18px;
  margin-bottom: 8px;
  color: #2c3e50;
`;

export const ImagePreview = styled.img`
  max-width: 30%;
  max-height: 300px;
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const RemoveImageButton = styled.button`
  background: none;
  border: none;
  color: red;
  cursor: pointer;
  margin-top: 10px;
  font-size: 16px;
  display: flex;
  align-items: center;

  &:hover {
    text-decoration: underline;
  }

  svg {
    margin-right: 5px;
  }
`;

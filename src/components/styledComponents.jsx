import styled, { keyframes } from 'styled-components'

export const fadeIn = keyframes`
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
`

export const Container = styled.div`
  display: flex;
  height: 100vh;
`

export const SidePanel = styled.div`
  position: relative;
  top: 0px;
  width: 300px;
  background: #fff;
  border-left: 1px solid #ccc;
  padding: 20px;
  animation: ${fadeIn} 0.3s ease-in-out;
`

export const Toolbar = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  background: white;
  border-radius: 8px;
  padding: 10px;
  z-index: 10;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  display: flex;
  gap: 8px;
`

export const Button = styled.button`
  padding: 6px 12px;
  border: none;
  background: #007bff;
  color: white;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
  &:hover {
    background: #0056b3;
  }
`

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;

  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 14px;
    transition: border 0.2s ease-in-out;

    &:focus {
      border-color: #007bff;
      outline: none;
    }
  }

  label {
    font-weight: 500;
    margin-bottom: 4px;
  }

  span {
    color: red;
    font-size: 12px;
    margin-top: 4px;
  }

  button[type='submit'] {
    padding: 10px;
    background: #28a745;
    border: none;
    color: white;
    font-weight: 600;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
      background: #218838;
    }
  }
`

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #888;
  &:hover {
    color: #000;
  }
`

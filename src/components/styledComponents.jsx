import styled, { keyframes } from 'styled-components'

export const fadeIn = keyframes`
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
`

export const Container = styled.div`
  display: flex;
  height: calc(100vh - 60px);

  @media (max-width: 768px) {
    height: calc(100vh - 100px);
  }

  @media (max-width: 480px) {
    height: calc(100vh - 220px);
  }
`

export const SidePanel = styled.div`
  position: relative;
  top: 0;
  width: 400px;
  background: #fff;
  border-left: 1px solid #ccc;
  padding: 20px;
  animation: ${fadeIn} 0.3s ease-in-out;
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
    border-left: none;
    border-top: 1px solid #ccc;
    position: fixed;
    bottom: 0;
    height: auto;
    max-height: 60%;
    z-index: 100;
  }

  @media (max-width: 480px) {
    padding: 16px;
    max-height: 70%;
  }
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
  flex-wrap: wrap;
  gap: 8px;
  max-width: 100%;
  justify-content: center;

  @media (max-width: 768px) {
    top: auto;
    bottom: 0;
    right: 0;
    left: 0;
    padding: 8px;
    border-radius: 0;
    box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
    gap: 6px;
  }
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
  width: 100%;
  max-width: 500px;
  padding: 20px 0px;
  box-sizing: border-box;

  input {
    width: 100%;
    padding: 10px 6px;
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
    margin-top: -12px;
    margin-bottom: 8px;
  }

  button[type='submit'] {
    padding: 12px;
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

  @media (max-width: 768px) {
    padding: 16px;
    gap: 12px;
  }

  @media (max-width: 480px) {
    padding: 12px;
    gap: 10px;

    input {
      font-size: 13px;
    }

    button[type='submit'] {
      font-size: 14px;
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
  z-index: 110;

  &:hover {
    color: #000;
  }

  @media (max-width: 480px) {
    top: 8px;
    right: 8px;
    font-size: 20px; /* Slightly larger for easier tapping */
  }

  @media (max-width: 360px) {
    font-size: 22px;
  }
`

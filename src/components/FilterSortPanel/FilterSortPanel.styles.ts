import styled from 'styled-components';

export const PanelContainer = styled.div`
    border: 1px solid #009a84;
    padding: 10px 15px;
    margin-bottom: 20px;
    border-radius: 10px;
`;

export const ToggleButton = styled.button`
    background-color: #ffffff;
    color: #2a9d8f;
    border: 2px solid #03b197;
    padding: 10px 16px;
    border-radius: 25px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    margin-bottom: 14px;
    transition: all 0.2s ease;
    outline: none;

    &:hover {
        background: #2a9d8f;
        color: white;
        box-shadow: 0 0 6px #21867a;
    }

    &:focus {
        box-shadow: 0 0 0 #21867a;
    }

    &:active {
        transform: scale(0.97);
    }
`;


export const CollapseSection = styled.div`
    animation: fadeIn 0.3s ease-in-out;

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-5px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;

export const FiltersRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`;

export const Section = styled.div`
    flex: 1 1 200px;
    min-width: 170px;

    h4 {
        margin-bottom: 10px;
        font-size: 17px;
        font-weight: 600;
    }

    label {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        cursor: pointer;
        user-select: none;
        font-size: 14px;
        padding: 4px 6px;
        border-radius: 6px;
        transition: background 0.2s ease;

        &:hover {
            background-color: #f5f5f5;
        }

        input[type='checkbox'] {
            appearance: none;
            width: 18px;
            height: 18px;
            border: 2px solid #2a9d8f;
            border-radius: 4px;
            margin-right: 10px;
            position: relative;
            cursor: pointer;
            transition: background-color 0.2s ease;

            &:checked {
                background-color: #21867a;
            }

            &:checked::after {
                content: '✔';
                position: absolute;
                left: 2.5px;
                bottom: 0.5px;
                font-size: 12px;
                color: #fff;
            }
        }
    }

    input[type='number'] {
        width: 100px;
        margin-left: 5px;
        padding: 4px 6px;
        border-radius: 4px;
        border: 1px solid #2a9d8f;
    }

    select {
        width: 160px;
        margin-top: 6px;
        padding: 6px;
        border-radius: 4px;
        border: 1px solid #2a9d8f;
    }
`;

export const ResetButton = styled.button`
  background: transparent;
  margin-left: 30px;
  color: #2a9d8f;
  border: 2px solid #2a9d8f;
  padding: 8px 14px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  outline: none;

  &:hover {
    background: #2a9d8f;
    color: white;
    box-shadow: 0 0 6px #21867a;
  }

  &:active {
    transform: scale(0.96);
  }
`;

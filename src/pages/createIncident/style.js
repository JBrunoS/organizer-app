import styled from 'styled-components/native'

// {Container, Categoria, Titulo, Descricao, Row, ValorTotal, Parcelas, Validade, Inicio, ButtonCadastrar, TextoButtonCadastrar}

export const Container = styled.View `
    flex: 1;
    align-items: center;
`

export const Header = styled.View `
    width: 100%;
    height: 50px;
    background-color: #F99030;
    position: relative;
    top: 0px;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding-left: 20px;
    margin-bottom: 20px;
`

export const TextoHeader = styled.Text `
    font-family: 'Roboto-Light'; 
    font-size: 20px;
    color: #FFF;
    margin-left: 20px;
`
export const Section = styled.ScrollView `
    flex: 1;
    margin: 0px auto;
    width: 90%;
`

export const Categoria = styled.TextInput`
    width: 90%;
    height: 45px;
    background: #e7e1e1;
    border-radius: 8px;
    margin: 5px auto; 
    padding-left: 10px;
    font-size: 18px;
`

export const Titulo = styled.TextInput `
    width: 90%;
    height: 45px;
    background: #e7e1e1;
    border-radius: 8px;
    margin: 5px auto;
    padding-left: 10px;
    font-size: 18px;
`

export const Descricao = styled.TextInput `
    width: 90%;
    max-width: 90%;
    background: #e7e1e1;
    border-radius: 8px;
    margin: 5px auto;
    padding-left: 10px;
    font-size: 18px;
    
`

export const Row = styled.View `
    width: 90%;
    height: auto;
    flex-direction: row;
    align-items: center;
    margin: 5px auto;
`

export const ValorTotal = styled.TextInput `
    width: 48%;
    height: 45px;
    background: #e7e1e1;
    border-radius: 8px;
    padding-left: 10px;
    font-size: 18px;
`

export const Parcelas = styled.TextInput `
    width: 48%;
    height: 45px;
    background: #e7e1e1;
    border-radius: 8px;
    margin-left: 4%;
    padding-left: 10px;
    font-size: 18px;
`

export const Validade = styled.TextInput `
    width: 90%;
    height: 45px;
    background: #e7e1e1;
    border-radius: 8px;
    margin: 5px auto;
    padding-left: 10px;
    font-size: 18px;
`

export const Inicio = styled.TextInput `
    width: 75%;
    height: 45px;
    background: #e7e1e1;
    border-radius: 8px;
    margin: 5px auto;
    padding-left: 10px;
    font-size: 14px;
`

export const ButtonCalendar = styled.TouchableOpacity `
    width: 20%;
    height: 45px;
    background: #337ed4;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    margin-left: 4%;
`

export const ButtonCadastrar = styled.TouchableOpacity `
    width: 90%;
    height: 45px;
    background: #337ed4;
    align-items: center;
    justify-content: center;
    margin: 20px auto;
    border-radius: 8px;
`
export const TextoButtonCadastrar = styled.Text `
    font-family: 'Roboto-Light'; 
    font-size: 20px;
    font-weight: 500;
    color: #FFF;
    
`
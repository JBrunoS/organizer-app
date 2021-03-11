import styled from 'styled-components/native'

// Container, Header, TextoHeader, Valores, ValorTotal, ValorRestante, Info, Titulo, Descricao, Parcelas

export const Container = styled.View `
    flex: 1;
`

export const ActivityIndicator = styled.ActivityIndicator `
    position: absolute;
    top: 40%;
    left: 45%;
    z-index: 1;
    
`
export const Header = styled.View `
    width: 100%;
    height: 50px;
    background-color: #F99030;
    position: relative;
    top: 0px;
    z-index: 2;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    padding-left: 20px;
    
`

export const TextoHeader = styled.Text `
    font-family: 'Roboto-Light'; 
    font-size: 20px;
    color: #FFF;
    margin-left: 20px;
`

export const Valores = styled.View `
    width: 90%;
    margin: 10px auto;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const ValorTotal = styled.Text `
    font-family: 'Roboto-Light'; 
    font-size: 15px;
`

export const ValorRestante = styled.Text `
    font-family: 'Roboto-Light'; 
    font-size: 15px;
`

export const ValorDebito = styled.Text `
    font-family: 'Roboto-Light'; 
    font-size: 15px;
    color: red;
`

export const Info = styled.View `
    width: 90%;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 10px auto;
`

export const Titulo = styled.Text `
    font-family: 'Roboto-Light'; 
    font-size: 18px;
`

export const Descricao = styled.Text `
    font-family: 'Roboto-Light'; 
    font-size: 15px;
    margin: 5px 0px 5px;
`

export const Parcelas = styled.Text `
    font-family: 'Roboto-Light'; 
    font-size: 18px;
    margin-top: 10px;
`

export const Body = styled.View `
    width: 90%;
    height: 90px;
    margin: 10px auto;
    background-color: #E7E1E1;
    border-radius: 8px;
    justify-content: center;
`

export const Campo1 = styled.View `
    flex-direction: row;
    
    align-items: center;
    justify-content: space-between;
    padding: 5px 10px;
`

export const Campo2 = styled.View `
    flex-direction: row;
    padding: 5px;
    align-items: center;
    justify-content: space-around;
`

export const Texto1 = styled.Text `
    font-family: 'Roboto-Light'; 
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 23px;
`
export const Texto2 = styled.Text `
    font-family: 'Roboto-Light'; 
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 23px;
`
export const Texto3 = styled.Text `
    font-family: 'Roboto-Light'; 
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 23px;
`
export const Texto4 = styled.Text `
    font-family: 'Roboto-Light'; 
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 23px;
`



export const Excluir = styled.TouchableOpacity `
    width: 80%;
    height: 40px;
    background-color: #FF0000;
    border-radius: 6px;
    align-items: center;
    justify-content: center;
`
export const TextoExcluir = styled.Text `
    font-family: 'Roboto-Light'; 
    color: #FFF;

`
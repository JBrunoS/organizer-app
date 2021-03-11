import styled from 'styled-components/native'

// Container, Header, TextoHeader, TextoInicial, Lista, Titulo, Preco, ButtonFloat, TextoButtonFloat

export const Header = styled.View `
    width: 100%;
    height: 50px;
    background-color: #F99030;
    position: relative;
    top: 0px;
    z-index: 2;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding-left: 20px;
    
`

export const ActivityIndicator = styled.ActivityIndicator `
    position: absolute;
    top: 40%;
    left: 45%;
    z-index: 1;
    
`

export const PrimeiroEspaco = styled.View `
    flex-direction: row;
    align-items: center;
    justify-content: center;
`
export const SegundoEspaco = styled.View `
    margin-right: 20px;
`

export const TextoHeader = styled.Text `
    font-family: 'Roboto-Light'; 
    font-size: 20px;
    color: #FFF;
    margin-left: 20px;
`

export const TextoInicial = styled.Text `
    font-family: 'Roboto-Light'; 
    margin-left: 20px;
    font-size: 22px;
`
export const ListMain = styled.View `
    height: 40%;
    margin: 0px;
`

export const Lista = styled.TouchableOpacity `
    flex-direction: row;
    width: 90%;
    height: 47px;
    background-color: #f93c30;
    margin: 5px 20px 15px;
    border-radius: 8px;
    align-items: center;
    justify-content: space-around;
    
`
export const ListaReceitas = styled.TouchableOpacity `
    flex-direction: row;
    width: 90%;
    height: 47px;
    background-color: #42bb3f;
    margin: 5px 20px 15px;
    border-radius: 8px;
    align-items: center;
    justify-content: space-around;
    overflow: hidden;
    
`

export const Titulo = styled.Text `
    font-family: 'Roboto-Light'; 
    color: #FFF;
    font-size: 15px;
`

export const Preco = styled.Text `
    font-family: 'Roboto-Light'; 
    color: #FFF;
    font-size: 15px;
`
export const TituloReceitas = styled.Text `
    font-family: 'Roboto-Light'; 
    color: #FFF;
    font-size: 15px;
`

export const PrecoReceitas= styled.Text `
    font-family: 'Roboto-Light'; 
    color: #FFF;
    font-size: 15px;
`
export const ButtonFloat = styled.TouchableOpacity `
    width: 95px;
    height: 35px;
    border-radius: 5px;
    background-color: #337ed4;
    justify-content: center;
    margin-right: 10px;
    
`
export const TextoButtonFloat = styled.Text `
    font-family: 'Roboto-Light'; 
    font-size: 18px;
    color: #FFF;
    margin: 7px auto;
    
`

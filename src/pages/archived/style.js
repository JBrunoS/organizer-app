import styled from 'styled-components/native'

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


export const Lista = styled.TouchableOpacity `
    flex-direction: row;
    width: 90%;
    height: 47px;
    background-color: #c3c1c1;
    margin: 5px auto 15px;
    border-radius: 8px;
    align-items: center;
    justify-content: space-around;
    
`

export const Titulo = styled.Text `
    font-family: 'Roboto-Light'; 
    color: #FFF;
    font-size: 18px;
`

export const Preco = styled.Text `
    font-family: 'Roboto-Light'; 
    color: #FFF;
    font-size: 18px;
`
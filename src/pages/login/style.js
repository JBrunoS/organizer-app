import styled from 'styled-components/native'

export const Container = styled.View `
    flex: 1;
    align-items: center;
    justify-content: flex-start;
    margin-top: 40px;
    
`

export const TextoApp = styled.Text `
    font-family: 'Roboto-Light'; 
    font-size: 25px;
    font-weight: 700;
    color: #F99330;
    margin-bottom: 50px;
`

export const ActivityIndicator = styled.ActivityIndicator `
    position: absolute;
    top: 40%;
    left: 45%;
    z-index: 3;
    
`

export const Email = styled.TextInput `
    width: 267px;
    height: 46px;
    border-radius: 6px;
    padding-left: 20px;
    background-color: #e7e1e1;
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 21px;
    margin: 10px;
`

export const Senha = styled.TextInput `
    width: 267px;
    height: 46px;
    border-radius: 6px;
    padding-left: 20px;
    background-color: #e7e1e1;
    font-style: normal;
    font-weight: 300;
    font-size: 18px;
    line-height: 21px;
    margin: 10px;
`

export const ButtonLogin = styled.TouchableOpacity `
    width: 191px;
    height: 40px;
    background: #337ED4;
    border-radius: 6px;
    align-items:center;
    justify-content: center;
    margin: 20px auto 10px;
`

export const LinkCadastro = styled.TouchableOpacity `
    width: 191px;
    height: 40px;
    align-items:center;
    justify-content: center;
    margin: 10px;

`

export const TextoButtonLogin = styled.Text `
    font-family: 'Roboto-Light'; 
    color: #FFF;
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 26px;
`

export const TextoLinkCadastro = styled.Text `
    font-family: 'Roboto-Light'; 
    color: #337ED4;
    font-style: normal;
    font-weight: 300;
    font-size: 20px;
    line-height: 26px;
`

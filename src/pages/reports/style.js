import styled from 'styled-components/native'

export const Container = styled.View `
    flex: 1;
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
export const ActivityIndicator = styled.ActivityIndicator `
    position: absolute;
    top: 40%;
    left: 45%;
    z-index: 3;
    
`

export const TextoSaidas = styled.Text ` 
    font-family: 'Roboto-Light'; 
    margin-top: 30px;
    font-size: 20px;
    margin-left: 20px;
`

export const TextoEntradas = styled.Text `
    font-family: 'Roboto-Light'; 
    font-size: 20px;
    margin-left: 20px;
    
`

export const TextoGastos = styled.Text `
    font-family: 'Roboto-Light'; 
    margin: 20px  auto 0px;
    font-size: 16px;
`
export const TextoReceitas = styled.Text `
    font-family: 'Roboto-Light'; 
    margin: 20px auto 0px;
    font-size: 16px;
`
export const TextoTotal = styled.Text `
    font-family: 'Roboto-Light'; 
    font-size: 16px;
    margin: 10px auto;
`
export const Legenda = styled.View `
    flex-direction: row;
    width: 60%;
    margin: 10px auto;
    justify-content: space-around;
`

export const LegendaGasto = styled.View `
    flex-direction: row;
    width: 50%;
    align-items: center;
    justify-content: center;
`
export const LegendaReceita = styled.View `
    flex-direction: row;
    width: 50%;
    align-items: center;
    justify-content: center;
`

export const BoxGasto = styled.View `
    width: 15px;
    height: 15px;
    border-radius: 7.5px;
    background-color: #f93c30;
`
export const BoxReceita = styled.View `
    width: 15px;
    height: 15px;
    border-radius: 7.5px;
    background-color: #42bb3f;
`
export const TextoLegendaGastos = styled.Text `
    font-family: 'Roboto-Light'; 
    font-size: 13px;
    margin-left: 5px;
`
export const TextoLegendaReceitas = styled.Text `
    font-family: 'Roboto-Light'; 
    font-size: 13px;
    margin-left: 5px;
`

export const ButtonRefresh = styled.TouchableOpacity `
    width: 60px;
    height: 40px;
    position: absolute;
    top: 5px;
    right: 5px;
    z-index: 3;
    align-items: center;
    justify-content: center;
    background-color: #f99030;
`

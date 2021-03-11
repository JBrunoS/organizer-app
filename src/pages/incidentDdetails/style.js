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

export const Modal = styled.Modal`
    
`

export const ModalContainer = styled.View `
    width: 80%;
    height: 80%;
    background-color: #fff;
    margin: auto;
    border-radius: 8px;
    elevation: 30;
    align-items: center;
    position: relative;
`

export const ModalTexto = styled.Text `
    margin-top: 5%;
    margin-bottom: 3%;
    font-size: 20px;
    font-family: 'Roboto-Light';
    
`
export const ModalTitulo = styled.TextInput `
    width: 90%;
    height: 45px;
    background: #e7e1e1;
    border-radius: 8px;
    margin: 5px auto;
    padding-left: 10px;
    font-size: 18px;
    
`
export const ModalDescricao = styled.TextInput `
    width: 90%;
    max-width: 90%;
    height: 20%;
    background: #e7e1e1;
    border-radius: 8px;
    margin: 5px auto;
    padding-left: 10px;
    font-size: 18px;
    
`

export const ModalClose = styled.TouchableOpacity `
    position: absolute;
    top: 15px;
    right: 20px;
`
export const ModalConfirma = styled.TouchableOpacity `
    background-color: #337ed4;
    width: 80%;
    height: 10%;
    align-items: center;
    justify-content: center;
    width: 90%;
    height: 45px;
    border-radius: 8px;
    margin: 15px;
    padding-left: 10px;
    font-size: 18px;
    
`
export const ModalConfirmaTexto = styled.Text `
    font-size: 18px;
    font-family: 'Roboto-Light';
    color: #FFF;
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
    font-size: 18px;
    line-height: 23px;
`



export const Excluir = styled.TouchableOpacity `
    width: 90px;
    height: 40px;
    background-color: #FF0000;
    border-radius: 6px;
    align-items: center;
    justify-content: center;
`
export const Editar = styled.TouchableOpacity `
    width: 90px;
    height: 40px;
    background-color: #eea63a;
    border-radius: 6px;
    align-items: center;
    justify-content: center;
`
export const Pago = styled.TouchableOpacity `
    width: 110px;
    height: 40px;
    background-color: #42bb3f;
    border-radius: 6px;
    align-items: center;
    justify-content: center;
`
export const TextoExcluir = styled.Text `
    font-family: 'Roboto-Light'; 
    color: #FFF;

`
export const TextoEditar = styled.Text `
    font-family: 'Roboto-Light'; 
    color: #FFF;
`
export const TextoPago = styled.Text `
    font-family: 'Roboto-Light'; 
    color: #FFF;
`
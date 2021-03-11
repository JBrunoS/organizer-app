import React, { useState } from 'react'
import {Keyboard, StyleSheet, ToastAndroid } from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {TextInputMask} from 'react-native-masked-text'

import {Container, 
        ActivityIndicator,  
        ScrollView,
        TextoApp, 
        NomeUsuario, 
        Email, 
        Telefone, 
        Senha, 
        ButtonCadastrar, 
        TextButton, 
        ButtonLogin, 
        TextoLinkLogin
        } from './style'

import api from '../../services/api';


export default function Register(){
    const [nome_usuario, setNomeUsuario] = useState('')
    const [email, setEmail] = useState('')
    const [telefone, setTelefone] = useState('')
    const [senha, setSenha] = useState('')
    const [animated, setAnimated] = useState(false)

    const [input2, setInput2] = useState('')
    const [input3, setInput3] = useState('')
    const [input4, setInput4] = useState('')
    const navigate = useNavigation();

    async function handleRegister(){

        if(nome_usuario == '' || email == '' || telefone == '' || senha == ''){
            alert('Por favor, preencher todos os campos');
            return;
        }
        setAnimated(true);

        const data = {nome_usuario, email, telefone, senha}

        try {
            const response = await api.post('user/register/', data);

            ToastAndroid.showWithGravity("Cadastro Realizado com sucesso!", ToastAndroid.LONG, ToastAndroid.CENTER)

            navigate.goBack();

        } catch (error) {
            alert(error.response.data.error)
        }

        setAnimated(false);
    }
    return(
        <Container>
            <ActivityIndicator size='large' animating={animated} color='#f99030' />
            <ScrollView>
                <TextoApp>Organizer</TextoApp>
                <NomeUsuario 
                    value={nome_usuario}
                    onChangeText={text => setNomeUsuario(text)}
                    placeholder='Nome de usário' 
                    autoCapitalize='words'
                    maxLength={15}
                    returnKeyType='go'
                    onSubmitEditing={() => (input2.focus())}
                    
                />
                <Email 
                    value={email}
                    onChangeText={text => setEmail(text)}
                    placeholder='e-mail' 
                    keyboardType='email-address'
                    keyboardAppearance='light'
                    autoCapitalize='none'
                    returnKeyType='go'
                    ref={(input) => setInput2(input)}
                    onSubmitEditing={() => (input3.focus())}
                />
                {/* <Telefone 
                    value={telefone}
                    onChangeText={text => setTelefone(text)}
                    placeholder='telefone' 
                    keyboardType='phone-pad'
                    returnKeyType='go'
                    ref={(input) => setInput3(input)}
                    onSubmitEditing={() => (input4.focus())}
                /> */}

                <TextInputMask
                    r
                    style={styles.telefone}
                    placeholder='telefone' 
                    type={'cel-phone'}
                    options={{
                        maskType: 'BRL',
                        withDDD: true,
                        dddMask: '(99) '
                      }}
                    value={telefone}
                    onChangeText={text => setTelefone(text)}
                    keyboardType='phone-pad'
                    returnKeyType='go'
                    refInput={(input) => setInput3(input)}
                    onSubmitEditing={() => (input4.focus())}
                />

                <Senha 
                    value={senha}
                    onChangeText={text => setSenha(text)}
                    placeholder='senha' 
                    returnKeyType='done'
                    keyboardType='numeric'
                    secureTextEntry={true}
                    maxLength={6}
                    ref={(input) => setInput4(input)}
                    onSubmitEditing={() => (Keyboard.dismiss())}
                />

                <ButtonCadastrar onPress={handleRegister} ><TextButton>Cadastrar</TextButton></ButtonCadastrar>
                <ButtonLogin onPress={() => (navigate.goBack())}><TextoLinkLogin>Já tenho cadastro. Login?</TextoLinkLogin></ButtonLogin>
            </ScrollView>
            
        </Container>
    )
}

const styles = StyleSheet.create({
    telefone: {
    width: 267,
    height: 46,
    borderRadius: 6,
    paddingLeft: 20,
    backgroundColor: '#e7e1e1',
    fontStyle: 'normal',
    fontWeight: '300',
    fontSize: 18,
    fontFamily: 'Roboto-Light', 
    lineHeight: 21,
    margin: 5,
    alignSelf: 'center'
    }
})
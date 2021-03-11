import React, { useState, useContext } from 'react'
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage'

import {Container, TextoApp, ActivityIndicator, Email, Senha, ButtonLogin, LinkCadastro, TextoButtonLogin, TextoLinkCadastro} from './style';
import api from '../../services/api'
import {AuthContext} from '../../AuthContext'

export default function Login(){
    const [login, setLogin] = useState('')
    const [senha, setSenha] = useState('')
    const [animated, setAnimated] = useState(false)
    const navigate = useNavigation();
    const { signIn } = useContext(AuthContext)

    async function handleLogin(){
        if(login == '' || senha == ''){
            alert('Favor, preencher todos os campos')
            return;
        }

        const data = { login, senha }
        setAnimated(true);

        try {
            const response = await api.post('user/login/', data);
            
            await AsyncStorage.setItem('storage', JSON.stringify(response.data));
            
            alert(`Seja Bem vindo! ${response.data.nome_usuario}`)
            signIn(response.data)

        } catch (error) {
            alert(error.response.data.error)
        }

        setAnimated(false);
    }

    return(
        <Container>
            <ActivityIndicator size='large' animating={animated} color='#f99030' />
            <TextoApp>Organizer</TextoApp>
            <Email 
                placeholder='e-mail ou nº telefone'
                autoCapitalize='none'
                value={login} 
                onChangeText={text => setLogin(text)}
            />
            <Senha 
                placeholder='senha' 
                keyboardType='number-pad'
                secureTextEntry={true}
                value={senha}
                onChangeText={text => setSenha(text)}
            />
            <ButtonLogin onPress={handleLogin} ><TextoButtonLogin>Entrar</TextoButtonLogin></ButtonLogin>
            <LinkCadastro><TextoLinkCadastro onPress={() => (navigate.navigate('register'))} >Cadastrar</TextoLinkCadastro></LinkCadastro>
        </Container>
    )
}
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { Keyboard, ToastAndroid, Alert } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Picker } from '@react-native-community/picker'
import DateTimePicker from '@react-native-community/datetimepicker'
import {useNavigation} from '@react-navigation/native'
import { TextInputMask } from 'react-native-masked-text'


import {
    Container, 
    Header,
    TextoHeader,
    Section,
    Titulo, 
    Descricao, 
    Row, 
    ValorTotal,
    Parcelas, 
    Validade, 
    Inicio,
    ButtonCalendar, 
    ButtonCadastrar, 
    TextoButtonCadastrar} from './style'

import api from '../../services/api'



export default function CreateIncidents(){
    
    const [input3, setInput3] = useState('')
    const [input4, setInput4] = useState('')
    const [input5, setInput5] = useState('')
    const [input6, setInput6] = useState('')
    const [input7, setInput7] = useState('')
    const [show, setShow] = useState(false);

    const [categoria, setCategoria] = useState('')
    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('')
    const [valorTotal, setValorTotal] = useState('0,00');
    const [numero_parcelas, setNumeroParcelas] = useState('')
    const [dia_pagamento, setDiaPagamento] = useState('')
    const [comeca_pagar, setComecaPagar] = useState('')

    const navigation = useNavigation();

    function validaDados(){

        if (parseInt(categoria) == 0 || categoria == '') {
            Alert.alert('Categoria inválida', 'Favor, selecionar uma categoria válida' )
            return false;
        }
        

        if (titulo.length <= 0) {
            Alert.alert('Título necessário', 'Favor, inserir um título')
            return false;
        }

        if (valorTotal == '0,00') {
            Alert.alert('Valor zerado', 'Preencher algum valor válido')
            return false;
        }
        
        if (numero_parcelas == isNaN || numero_parcelas == 0) {
            Alert.alert('Parcelas zeradas', 'Preencher com o número de parcelas válido')
            return false;
        }
        
        if (dia_pagamento == '' || dia_pagamento == 0 || dia_pagamento > 30) {
            Alert.alert('Dia de pagamento', 'Favor inserir um dia válido')
            return false;
        }

        if (comeca_pagar == '') {
            Alert.alert('Data inválida', 'Favor, selecionar a data')
            return false;
        }

        return true;
    }

    async function handleSubmit(){

        const jsonValue = await AsyncStorage.getItem('storage')
        const data = JSON.parse(jsonValue);

        const valor_total = (valorTotal).substring(2).replace('.', '').replace(',', '.');
        
        const body = {categoria, titulo, descricao, valor_total, numero_parcelas, dia_pagamento, comeca_pagar}

        validaDados();

        if(validaDados){
            try {
                await api.post('pagamentos', body, {
                    headers: {
                        authorization: data.id
                    }
                }).then(response =>{
                    ToastAndroid.showWithGravity('Inserido com sucesso!' , ToastAndroid.LONG, ToastAndroid.CENTER);
                    navigation.goBack();
                })
                    
                    
                    
    
            } catch (error) {
                console.log(error)
            }
        }
            
        
    }

    function showDatePicker(){
        Keyboard.dismiss();
        setShow(true);
    }
    

    return(
            <Container>
                <Header>
                    <Icon name='arrow-left' size={25} color='#FFF' onPress={() => (navigation.goBack())} />
                    <TextoHeader>Adicionar Pagamento</TextoHeader>
                </Header>
                
                <Section>
                    <Picker
                        selectedValue={categoria}
                        onValueChange={(itemValue, itemIndex) => setCategoria(itemValue)}
                        mode='dialog'
                        style={{width: 250, marginLeft: 20, }}
                        prompt='Escolha uma categoria'
                    >
                        
                        <Picker.Item label='Escolher um item' value='0'/>
                        <Picker.Item label='Pagar' value='1'/>
                        <Picker.Item label='Receber' value='2' />
                    </Picker>
                    <Titulo 
                        value={titulo}
                        onChangeText={text => setTitulo(text)}
                        placeholder='Título'    
                        style={{fontFamily: 'Roboto-Light' }}
                        returnKeyType='go' 
                        maxLength={20}
                        
                        onSubmitEditing={() => { input3.focus();}}
                        blurOnSubmit={false}
                    />
                    <Descricao 
                        value={descricao}
                        onChangeText={text => setDescricao(text)}
                        placeholder='Descrição' 
                        style={{fontFamily: 'Roboto-Light' }}
                        textAlignVertical='top' 
                        returnKeyType='go'
                        maxLength={100}
                        multiline={true}
                        numberOfLines={4}
                        ref={(input) => setInput3(input)} 
                        onSubmitEditing={() => { input4.focus();}}
                        blurOnSubmit={false}
                    />
                    
                    <Row>
                        {/* <ValorTotal 
                            value={valor_total}
                            onChangeText={text => setValorTotal(text)}
                            placeholder='Valor Total'
                            style={{fontFamily: 'Roboto-Light' }}
                            keyboardType='numeric'
                            returnKeyType='go'
                            ref={(input) => setInput4(input)} 
                            onSubmitEditing={() => { input5.focus();}}
                            blurOnSubmit={false}
                        /> */}
                        <TextInputMask 
                            style={{width: '48%', height: 45, backgroundColor: '#e7e1e1', borderRadius: 8, paddingLeft: 10, fontSize: 18, fontFamily: 'Roboto-Light'}}
                            type={'money'}
                            value={valorTotal}
                            onChangeText={text => setValorTotal(text)}
                            keyboardType='numeric'
                            returnKeyType='go'
                            ref={(input) => setInput4(input)} 
                            onSubmitEditing={() => { input5.focus();}}
                            blurOnSubmit={false}
                        />

                        <Parcelas 
                            value={numero_parcelas}
                            onChangeText={text => setNumeroParcelas(text)}
                            placeholder='Nº Parcelas' 
                            style={{fontFamily: 'Roboto-Light' }}
                            keyboardType='number-pad' 
                            returnKeyType='go'
                            maxLength={3}
                            ref={(input) => setInput5(input)} 
                            onSubmitEditing={() => { input6.focus();}}
                            blurOnSubmit={false}
                        />

                    </Row>

                    <Validade 
                        value={dia_pagamento}
                        onChangeText={text => setDiaPagamento(text)}
                        placeholder='Em que dia vai ser pago?' 
                        style={{fontFamily: 'Roboto-Light' }}
                        keyboardType='number-pad'
                        returnKeyType='go' 
                        maxLength={2}
                        ref={(input) => setInput6(input)} 
                        onSubmitEditing={() => { input7.focus();}}
                        blurOnSubmit={false}
                    />
                    <Row>
                    <Inicio 
                        value={String(comeca_pagar)}
                        editable={false}
                        placeholder='Quando vai começar a pagar?'
                        style={{fontFamily: 'Roboto-Light' }}
                        ref={(input) => setInput7(input)} 
                        onFocus={() => showDatePicker()}
                        
                    />
                    <ButtonCalendar
                        onPress={showDatePicker}
                    >
                        <Icon name='calendar' size={30} color='#FFF' />
                    </ButtonCalendar>
                    </Row>
                    

                    { show && ( <DateTimePicker 
                        style={{width: 300, margin: 5, marginLeft: 20}}
                        mode='date'
                        display='default'
                        placeholder='Quando vai começar a pagar?'
                        style={{fontFamily: 'Roboto-Light' }}
                        value={new Date()}
                        onChange={(event, value) => {

                            if(event.type === 'dismissed'){
                                setShow(!show);
                            }
                            
                            if(event.type === 'set'){
                                let dia = value.getDate() || '';
                                let mes = value.getMonth() + 1 || '';
                                let ano = value.getFullYear() || '';
                                

                                const data = (dia < 10 ? '0' + dia : dia) + '/' + (mes < 10 ? '0' + mes : mes) + '/' + ano;
                                console.log(data);
                                setShow(false);
                                
                                setComecaPagar(data)
                            }
                            
                            
                            
                        }}
                        
                        
                    />)}

                    <ButtonCadastrar 
                        onPress={handleSubmit}
                    >
                        <TextoButtonCadastrar>Anotar</TextoButtonCadastrar>
                    </ButtonCadastrar>
                </Section>
                
            </Container>
    )
}
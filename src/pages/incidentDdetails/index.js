import React, { useState, useEffect } from  'react'
import { View, FlatList, Switch, Alert, ToastAndroid } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Picker } from '@react-native-community/picker'


import {
        ActivityIndicator,
        Header,
        Modal,
        ModalContainer,
        ModalTexto,
        ModalDescricao,
        ModalTitulo,
        ModalClose,
        ModalConfirma,
        ModalConfirmaTexto,
        TextoHeader,
        Valores, 
        ValorTotal, 
        ValorRestante, 
        ValorDebito, 
        Info, 
        Titulo, 
        Descricao, 
        Parcelas, 
        Body, 
        Campo1, 
        Campo2, 
        Texto1, 
        Texto2, 
        Texto3, 
        Texto4, 
        Excluir,
        Editar,
        Pago,
        TextoExcluir,
        TextoEditar,
        TextoPago,
    } from './style'

import api from '../../services/api'

export default function IncidentDetails(){

    const [incidents, setIncidents] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [animated, setAnimated] = useState(false)

    const [active, setActive] = useState(false)
    const [categoria, setCategoria] = useState('')
    const [titulo, setTitulo] = useState('')
    const [descricao, setDescricao] = useState('')

    const navigate = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;
    const pagamento_id = incident.id;
    const valor_restante = (incidents.length > 0 ? parseFloat(incidents[0].valor_restante).toFixed(2) : '');


    async function toggleSwitch(id, estado, valor_parcela){
        setAnimated(true)
        
        const status = !estado;

        const data = {status, valor_parcela};

        await api.put(`parcelas/${id}`, data, {
            headers: {
                authorization: pagamento_id
            }
        })
        
        loadData();
        setAnimated(false);
    }

    useEffect(()=> {
        loadData();
    }, [])

    async function loadData(){
        try {
            await api.get(`parcelas/pagamento/${pagamento_id}`).then(response => {
                setIncidents(response.data)
                setCategoria(response.data[0].categoria)
                setTitulo(response.data[0].titulo)
                setDescricao(response.data[0].descricao)
                
            })   
        } catch (error) {
            console.log(error)
        }
    }

    function emiteAlerta(){
        if (valor_restante <= 0) {
            Alert.alert(
                "Confirmação de pagamento",
                "Já está tudo pago, posso mover para os arquivados?",
                [
                  {
                    text: "Cancel",
                    // onPress: () => alert("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => handleAllPay() }
                ],
                { cancelable: false }
            )
        }
    }

    function Head(){
        return(
            <View>
                

                <Info>
                    <Titulo>{incidents.length > 0 ? incidents[0].titulo : ''}</Titulo>
                    <Descricao>{incidents.length > 0 ? incidents[0].descricao : ''}</Descricao>
                    <Parcelas>Nº de parcelas: {incidents.length > 0 ? incidents[0].numero_parcelas : ''}</Parcelas>
                </Info>
            </View>
        )
    }

    async function refreshList(){
        setRefreshing(true)

        await loadData();

        setRefreshing(false)
    }

    async function handleDelete(){
        setAnimated(true)
        try {
            await api.delete(`pagamentos/${pagamento_id}`)
        .then(response => {
            ToastAndroid.showWithGravity(response.data.message, ToastAndroid.LONG, ToastAndroid.CENTER)
            navigate.goBack();
        })
        } catch (error) {
            alert(error)
        }
        setAnimated(false)
    }

    async function handleAllPay(){
        setAnimated(true);
        const valor_restante = incidents[0].valor_restante;

        const data = { valor_restante };
        try {
            await api.put(`pagamentos/status/${pagamento_id}`, data)
            .then(response => {
                ToastAndroid.showWithGravity(response.data.message, ToastAndroid.LONG, ToastAndroid.CENTER)
                navigate.goBack();
                
            })
        } catch (error) {
            alert(error)
        }

        setAnimated(false);
    }

    async function handleEdit(){
        setAnimated(true);
        const data = {categoria, titulo, descricao};

        try {
            await api.put(`pagamentos/${pagamento_id}`, data)
            .then(response =>{
                ToastAndroid.showWithGravity(response.data, ToastAndroid.LONG, ToastAndroid.CENTER)
            })
        } catch (error) {
            alert(error)
        }

        setActive(!active);
        loadData();
        setAnimated(false);
    }

    
    return(
        <View style={{flex: 1}}>
            <Header>
                <Icon name='arrow-left' size={25} color='#FFF' onPress={() => (navigate.goBack())} />
                <TextoHeader>Parcelas</TextoHeader>
            </Header>

            <ActivityIndicator size='large' animating={animated} color='#f99030' />
            <Valores>
                    <ValorTotal>Total: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incidents.length > 0 ? incidents[0].valor_total : '')}</ValorTotal>
                    <ValorRestante>Restante: <ValorDebito>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(valor_restante <= 0 ? '' : valor_restante)}</ValorDebito></ValorRestante>
                    {( valor_restante <= 0 ? <Icon name='check-circle' size={20} color='#42bb3f' />  : <Icon name='alert-circle' size={20} color='#f93c30' /> )}
            </Valores>

            <FlatList 
                style={{marginBottom: 10, marginVertical: 0}}
                data={incidents}
                ListHeaderComponent={Head}
                keyExtractor={incidents => String(incidents.id)}
                onRefresh={refreshList}
                refreshing={refreshing}
                renderItem={({item: incident}) => (
                    <Body>
                        <Campo1>
                        <Texto1>{incident.numero_parcela}ª Parcela</Texto1>
                        <Texto2>{incident.data_parcela}</Texto2>
                        </Campo1>
                        <Campo2>
                            <Texto3>Valor: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.valor_parcela)}</Texto3>
                            <Texto4>{
                            incident.categoria == 1 ? (
                                incident.status == 0 ? 'Não paguei!' : 'Já paguei!'
                            ) : (
                                incident.status == 0 ? 'Não recebi!' : 'Já recebi!'
                            )
                            }</Texto4>
                            <Switch 
                                // trackColor={{ false : '#8bc98a', true : '#Fa6f66' }}
                                thumbColor={ incident.status ? "#42bb3f" : "#FF0000"}
                                onChange={() => toggleSwitch(incident.id, incident.status, incident.valor_parcela)}
                                value={incident.status == 0 ? false : true}
                            />
                        </Campo2>
                    </Body>
                )}
            />

            <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15}}>
                <Excluir onPress={handleDelete} ><TextoExcluir>Excluir</TextoExcluir></Excluir>
                <Editar onPress={() => setActive(true) } ><TextoEditar>Editar</TextoEditar></Editar>
                <Pago onPress={handleAllPay} >
                    <TextoPago>Tá tudo pago!</TextoPago>
                </Pago>
            </View>
            
            <Modal
                animationType='slide'
                visible={active}
                transparent={true}
            >
                <ModalContainer>
                    <ModalTexto>Editar</ModalTexto>
                    <Picker
                        selectedValue={categoria}
                        onValueChange={(itemValue, itemIndex) => setCategoria(itemValue)}
                        mode='dialog'
                        style={{width: 250, marginLeft: 20, fontFamily: 'Roboto-Light'}}
                        prompt='Escolha uma categoria'
                    >
                        
                        <Picker.Item label='Pagar' value={1}/>
                        <Picker.Item label='Receber' value={2}/>
                    </Picker>
                    <ModalTitulo
                        value={titulo}
                        onChangeText={text => setTitulo(text)}
                        placeholder='Título'    
                        style={{fontFamily: 'Roboto-Light' }}
                        returnKeyType='go' 
                        maxLength={20}
                        
                        
                    />
                    <ModalDescricao
                        value={descricao}
                        onChangeText={text => setDescricao(text)}
                        placeholder='Descrição' 
                        style={{fontFamily: 'Roboto-Light' }}
                        textAlignVertical='top' 
                        returnKeyType='go'
                        maxLength={100}
                        multiline={true}
                        numberOfLines={4}
                    />

                    <ModalClose onPress={() => setActive(!active)}><Icon name='x-square' size={25} color='#959da5' /></ModalClose>
                    <ModalConfirma onPress={handleEdit} ><ModalConfirmaTexto>Salvar</ModalConfirmaTexto></ModalConfirma>

                </ModalContainer>
            </Modal>
            

        </View>
    )
}
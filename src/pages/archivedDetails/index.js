import React, { useState, useEffect } from  'react'
import { View, FlatList, Switch, ToastAndroid,  } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation, useRoute } from '@react-navigation/native'


import {
        ActivityIndicator,
        Header,
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
        TextoExcluir,
    } from './style'

import api from '../../services/api'



export default function ArchivedDetails(){

    const [incidents, setIncidents] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [animated, setAnimated] = useState(false)

    const navigate = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;
    const pagamento_id = incident.id;


    useEffect(()=> {
        loadData();
    }, [])

    async function loadData(){
        try{
            await api.get(`parcelas/pagamento/${pagamento_id}`)
            .then(response => {
            
                setIncidents(response.data)
            })
        }catch(error){
            console.log(error)
        }
        
    }

    function Head(){
        return(
            <View>
                <Valores>
                    <ValorTotal>Total: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incidents.length > 0 ? incidents[0].valor_total : '')}</ValorTotal>
                    <ValorRestante>Restante: <ValorDebito>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incidents.length > 0 ? incidents[0].valor_restante : '')}</ValorDebito></ValorRestante>
                    <Icon name='check-circle' size={25} color='#42bb3f' />
                </Valores>

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

    
    return(
        <View style={{flex: 1}}>
            <Header>
                <Icon name='arrow-left' size={25} color='#FFF' onPress={() => (navigate.goBack())} />
                <TextoHeader>Parcelas</TextoHeader>
            </Header>

            <ActivityIndicator size='large' animating={animated} color='#f99030' />

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
                            <Texto4>{incident.status == 0 ? 'Não paguei ainda!' : 'Já paguei!'}</Texto4>
                            <Switch 
                                // trackColor={{ false : '#8bc98a', true : '#Fa6f66' }}
                                thumbColor={ incident.status ? "#42bb3f" : "#FF0000"}
                                value={incident.status == 0 ? false : true}
                            />
                        </Campo2>
                    </Body>
                )}
            />

            <View style={{flexDirection: 'row', justifyContent: 'space-around', marginBottom: 5}}>
                <Excluir onPress={handleDelete} ><TextoExcluir>Excluir</TextoExcluir></Excluir>
            </View>

            

        </View>
    )
}
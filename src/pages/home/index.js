import React, { useState, useEffect, useContext } from 'react'
import Icon from 'react-native-vector-icons/Feather'
import { FlatList, View } from 'react-native'
import { useNavigation, DrawerActions } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'

import { Header, ActivityIndicator, PrimeiroEspaco, SegundoEspaco, TextoHeader, TextoInicial, ListMain, Lista, ListaReceitas, Titulo, TituloReceitas, Preco, PrecoReceitas, ButtonFloat, TextoButtonFloat } from './style'
// import Header from '../../pages/Header'
import api from '../../services/api'
import {AuthContext} from '../../AuthContext'
import Notification from '../../services/Notification'


export default function Home(){
    const navigate = useNavigation();
    const [nome, setNome] = useState('');
    const [incidentsPagamentos, setIncidentsPagamentos] = useState([])
    const [incidentsReceitas, setIncidentsReceitas] = useState([])
    const [parcelas, setParcelas] = useState([])
    const [refreshingPagamentos, setRefreshingPagamentos] = useState(false)
    const [refreshingReceitas, setRefreshingReceitas] = useState(false)
    const [animated, setAnimated] = useState(true)

    const {signOut} = useContext(AuthContext);
    
    useEffect(() => {
        loadParcelas();
        localNotification();
    }, []);

    useEffect(() => {
        loadPagamentos();
    }, [])
    
    useEffect(() => {
        loadReceitas();
    }, [])

    function localNotification(){
        var date = new Date(Date.now());
        
        for (let i = 0; i < parcelas.length; i++) {   
            
            let data = parcelas[i].data_parcela;

            let day = data.slice(0, 2);
            let month = data.slice(3, 5);
            let year = data.slice(6, 9);

            date.setDate(day);
            date.setMonth(month)
            date.setFullYear(year);

            Notification
            .configure()
            .localNotificationSchedule({
                
                title: `${parcelas[i].titulo}` ,
                message: `${parcelas[i].descricao}`, // (required)
                subText: `${parcelas[i].categoria == 1 ? 'Pagar' : 'Receber'} - ${parcelas[i].data_parcela}`,
                date: date, // in 60 secs
                color: `${parcelas[i].categoria == 1 ? '#f93c30' : '#42bb3f'}`,
                allowWhileIdle: false, // (optional) set notification to work while on doze, default: false

            })
        }
    }

    async function loadParcelas(){
        const jsonValue = await AsyncStorage.getItem('storage')
        const data = JSON.parse(jsonValue)

        if (data != null) {
            
            try {
                await api.get(`parcelas/parcelas/${data.id}`)
                .then(response => {
                    setParcelas(response.data);
                })
            } catch (error) {
                console.log(error);
            }
        }
    }

    async function loadPagamentos(){
        const jsonValue = await AsyncStorage.getItem('storage')
        const data = JSON.parse(jsonValue)
        
        if(data != null){
            setNome(data.nome_usuario)


            try {
                await api.get('pagamentos', {
                    headers: {
                        authorization: data.id 
                    }
                })
                .then(response => {
                    setIncidentsPagamentos(response.data)

                })


            } catch (error) {
                console.log(error)
                
            }   
            setAnimated(false);
        }else{
            setNome('')
            setIncidentsPagamentos([]);
        }

        
    }

    async function loadReceitas(){

        const jsonValue = await AsyncStorage.getItem('storage')
        const data = JSON.parse(jsonValue)

        if(data != null){
            try {
                await api.get('pagamentos/carregareceitas', {
                    headers: {
                        authorization: data.id
                    }
                })
                .then(response => {
                    setIncidentsReceitas(response.data)
                })
            } catch (error) {
                console.log(error)
                
            }
        }
        else{
            setIncidentsReceitas([]);
        }

        
    }

    function navigateToDetails(incident){
        navigate.navigate('incidentDetails', { incident })
        
    }

    async function refreshListReceitas(){
        setRefreshingReceitas(true)

        await loadReceitas();

        setRefreshingReceitas(false)
    }

    async function refreshListPagamentos(){
        setRefreshingPagamentos(true)

        await loadPagamentos();

        setRefreshingPagamentos(false)
    }

    function handleDrawer(){
        navigate.dispatch(DrawerActions.toggleDrawer());
    }

    async function handleLogOut(){
        AsyncStorage.clear();
        signOut();
    }


    return(
        <View>
            <Header>
                <PrimeiroEspaco>
                    <Icon name='menu' size={25} color='#FFF' onPress={handleDrawer} />
                    <TextoHeader>Organizer</TextoHeader>
                </PrimeiroEspaco>
                <SegundoEspaco>
                    <Icon name='log-out' size={25} color='#fff' onPress={handleLogOut} />    
                </SegundoEspaco>
            </Header>

            <View style={{flexDirection: 'row', height: 50, alignItems: 'center', justifyContent: 'space-between'}}>
            <TextoInicial>Olá, {nome}</TextoInicial>
            <ButtonFloat onPress={() => navigate.navigate('createIncident')}><TextoButtonFloat>Adicionar</TextoButtonFloat></ButtonFloat>
            </View>
            
            <ActivityIndicator animating={animated} size='large'/>
            <ListMain >
            <TextoInicial>Pagar</TextoInicial>
                <FlatList
                    data={incidentsPagamentos}
                    keyExtractor={incidents => String(incidents.id)}
                    onRefresh={refreshListPagamentos}
                    refreshing={refreshingPagamentos}
                    renderItem={({item: incidents}) => (
                        <Lista onPress={() => navigateToDetails(incidents)}> 
                            <Titulo> {incidents.titulo} </Titulo>
                            <Preco>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incidents.valor_total)} </Preco>
                            <Icon name='arrow-right' size={20} color='#fff' />
                        </Lista>
                        
                    )}
                />
            </ListMain>
            
            <ListMain>
            <TextoInicial>Receber</TextoInicial>
                <FlatList
                    data={incidentsReceitas}
                    keyExtractor={incidents => String(incidents.id)}
                    onRefresh={refreshListReceitas}
                    refreshing={refreshingReceitas}
                    renderItem={({item: incidents}) => (
                        <ListaReceitas onPress={() => navigateToDetails(incidents)}> 
                            <TituloReceitas> {incidents.titulo} </TituloReceitas>
                            <PrecoReceitas>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incidents.valor_total)} </PrecoReceitas>
                            <Icon name='arrow-right' size={20} color='#fff' />
                        </ListaReceitas>
                        
                    )}
                />
            </ListMain>
            
        </View>
    )
}
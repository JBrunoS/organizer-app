import React, {useState, useEffect} from 'react'
import { View, ActivityIndicator, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'

import { Header, TextoHeader, Lista, Titulo, Preco} from './style'
import api from '../../services/api'

export default function Archived(){
    const navigate = useNavigation();
    const [userID, setUserID] = useState('');
    const [incidents, setIncidents] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const [animated, setAnimated] = useState(true)

    useEffect(() => {
        loadData();
    }, [incidents])
    
    useEffect(() => {
        verificaLogin();
    }, [incidents])

    async function verificaLogin(){
        const jsonValue = await AsyncStorage.getItem('storage')
        const data = JSON.parse(jsonValue)

        if(data != null){
            
        }
    }

    async function loadData(){

        const jsonValue = await AsyncStorage.getItem('storage')
        const data = JSON.parse(jsonValue);
        
        if (data != null) {
            try {
                await api.get('pagamentos/arquivados', {
                    headers: {
                        authorization: data.id
                    }
                })
                .then(response => {
                    setIncidents(response.data)
                })
                
            } catch (error) {
                console.log(error)
            }
            
            setAnimated(false);
        }
    }

    function navigateToDetails(incident){
        navigate.navigate('archivedDetails', { incident })
    }

    async function refreshList(){
        setRefreshing(true)

        await loadData();

        setRefreshing(false)
    }

    return(
        <View>
            <Header>
                <Icon name='arrow-left' size={25} color='#fff' onPress={() => (navigate.goBack()) } />
                <TextoHeader>Arquivados</TextoHeader>
            </Header>

            <ActivityIndicator animating={animated} size='small'/>
            {
                incidents.length == 0 ? (
                    <Icon name='check-square' size={50} color='#c3c1c1' style={{marginTop: '10%', alignSelf: 'center'}} />
                ) : (
                    
                    <FlatList
                        style={{marginBottom: 120}}
                        showsVerticalScrollIndicator={false}
                        data={incidents}
                        keyExtractor={incidents => String(incidents.id)}
                        onRefresh={refreshList}
                        refreshing={refreshing}
                        renderItem={({item: incidents}) => (
                            <Lista onPress={() => navigateToDetails(incidents)}> 
                                <Titulo> {incidents.titulo} </Titulo>
                                <Preco>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incidents.valor_total)} </Preco>
                                <Icon name='dollar-sign' size={20} color={incidents.categoria == 1 ? '#f93c30' : '#42bb3f'} />
                            </Lista>
                        )}
                    />
                )
            }
           
            
        </View>
    )
}
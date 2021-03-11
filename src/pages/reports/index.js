import React, {useEffect, useState} from 'react'
import {BarChart, PieChart} from 'react-native-svg-charts'
import { View, ScrollView, ToastAndroid } from 'react-native'
import { Text } from 'react-native-svg'
import Icon from 'react-native-vector-icons/Feather'
import {useNavigation} from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage'

import {Container, 
        Header, 
        TextoHeader, 
        TextoSaidas, 
        TextoEntradas, 
        ActivityIndicator, 
        TextoReceitas, 
        TextoTotal,
        Legenda,
        LegendaGasto, 
        LegendaReceita,
        BoxGasto, 
        BoxReceita, 
        TextoLegendaGastos, 
        TextoLegendaReceitas,
        ButtonRefresh
    } from './style'

import api from '../../services/api'

export default function Bars(){
    
    const [gastos, setGastos ] = useState('')
    const [receitas, setReceitas] = useState('')

    const [entradas, setEntradas] = useState('')
    const [saidas, setSaidas] = useState('')

    const [animated, setAnimated] = useState(false)

    const navigate = useNavigation();

    useEffect(() => {
        loadData();
    }, []);
    

    const data = [
        {
            key: 1,
            amount: entradas == undefined ? 0 : parseFloat(entradas).toFixed(2),
            svg: { fill: '#42bb3f' }
        },
        {
            key: 2,
            amount: saidas == undefined ? 0 : parseFloat(saidas).toFixed(2),
            svg: { fill: '#f93c30' },
        }
        
    ]

    const Labels = ({ slices, height, width }) => {
        return slices.map((slice, index) => {
            const { labelCentroid, pieCentroid, data } = slice;
            return (
                <Text
                    key={index}
                    x={pieCentroid[ 0 ]}
                    y={pieCentroid[ 1 ]}
                    fill={'#000'}
                    textAnchor={'middle'}
                    alignmentBaseline={'middle'}
                    fontSize={16}
                >
                    {data.amount}
                </Text>
            )
        })
    }

    function BarsGastos(){
        return(
            <View style={{ height: 200, padding: 20, backgroundColor: '#e7e1e1', borderRadius: 8, margin: 5 }}>
                <BarChart
                    style={{ flex: 1, borderBottomWidth: 0.7, borderBottomColor: '#b2b0b0' }}
                    data={gastos}
                    gridMin={0}
                    svg={{ fill: '#f93c30' }}
                />
                
            </View>
        )
    }

    function BarsReceitas(){
        return(
            <View style={{ height: 200, padding: 20, backgroundColor: '#e7e1e1', borderRadius: 8, margin: 5 }}>
                <BarChart
                    style={{ flex: 1, borderBottomWidth: 0.7, borderBottomColor: "#b2b0b0" }}
                    data={receitas}
                    gridMax={12}
                    gridMin={0}
                    svg={{ fill: '#42bb3f' }}
                />
                
            </View>
        )
    }

    async function loadTotalGastos(){
        const jsonValue = await AsyncStorage.getItem('storage')
        const data = JSON.parse(jsonValue)
        
        try {
            await api.get(`parcelas/gastos/${data.id}`)
            .then(response =>{
                setGastos(response.data[0].contasPagar);
            })
        } catch (error) {
            console.log({error})
        }

    }
    
    async function loadTotalReceitas(){
        const jsonValue = await AsyncStorage.getItem('storage')
        const data = JSON.parse(jsonValue)
        
        try {
            await api.get(`parcelas/receitas/${data.id}`)
            .then(response =>{
                setReceitas(response.data[0].contasReceber);
            })
        } catch (error) {
            console.log({error})
        }

    }

    async function loadTotalPagar(){
        const jsonValue = await AsyncStorage.getItem('storage')
        const data = JSON.parse(jsonValue)

        try {
            await api.get(`pagamentos/gastostotais/${data.id}`)
            .then(response => {
                setSaidas(response.data[0].total)
            })
        } catch (error) {
            console.log(error)
        }
    }

    async function loadTotalReceber(){
        const jsonValue = await AsyncStorage.getItem('storage')
        const data = JSON.parse(jsonValue)

        try {
            await api.get(`pagamentos/receitastotais/${data.id}`)
            .then(response => {
                setEntradas(response.data[0].total)
            })
        } catch (error) {
            console.log(error)
        }
    }

    function loadData(){
        setAnimated(true)

        loadTotalGastos()
        loadTotalPagar()
        loadTotalReceber()
        loadTotalReceitas()

        setAnimated(false)
        ToastAndroid.showWithGravity('Relatório atualizado!', ToastAndroid.LONG, ToastAndroid.CENTER)
    }

    

    return (
        <Container>
            
            <Header>
                <Icon name='arrow-left' size={25} color='#fff' onPress={() => (navigate.goBack()) } />
                <TextoHeader>Relatórios</TextoHeader>
            </Header>

            <ActivityIndicator size='large' animating={animated} color='#f99030' />

            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <TextoSaidas>Contas a Pagar: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(gastos)} </TextoSaidas>
                <TextoEntradas>Contas a Receber: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(receitas)}</TextoEntradas>

                {/* <TextoGastos>Relatório de Gastos</TextoGastos>
                
                <BarsGastos />

                <TextoReceitas>Relatório de Receitas</TextoReceitas>
                <BarsReceitas /> */}
                
                <TextoTotal>Despesas e receitas - Total</TextoTotal>
                
                <Legenda>
                    <LegendaReceita>
                        <BoxReceita></BoxReceita>
                        <TextoLegendaReceitas>Receitas</TextoLegendaReceitas>
                    </LegendaReceita>

                    <LegendaGasto>
                        <BoxGasto></BoxGasto>
                        <TextoLegendaGastos>Gastos</TextoLegendaGastos>
                    </LegendaGasto>
                </Legenda>
                
                <PieChart
                    style={{ height: 200 }}
                    valueAccessor={({ item }) => item.amount}
                    data={data}
                    spacing={0}
                    outerRadius={'85%'}
                >
                    <Labels/>
                </PieChart>
                
            </ScrollView>
            <ButtonRefresh onPress={()=> loadData()}><Icon name='refresh-cw' size={20} color='#FFF' /></ButtonRefresh>
        </Container>
        
    )
}

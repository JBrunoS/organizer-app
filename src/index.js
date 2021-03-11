import React from 'react'
import 'intl'
import 'intl/locale-data/jsonp/pt-BR'
import {StatusBar} from 'react-native'

import Routes from './routes'

export default function App(){

    return(
        <>
        <StatusBar backgroundColor="#cf792a" />
        <Routes  />
        </>
    )
}
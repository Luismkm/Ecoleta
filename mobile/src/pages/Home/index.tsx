import React, { useState, useEffect } from 'react'
import { Feather as Icon } from '@expo/vector-icons'
import { View, ImageBackground, Image, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform} from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import RNPickerSelect from 'react-native-picker-select'
import axios from 'axios'

interface IBGEResponse {
  sigla: string
}

interface IBGECityResponse {
  nome: string
}

interface ArrayObj{
  label: string,
  value: string
}

const Home = () =>{
    const[uf, setUf] = useState<ArrayObj[]>([])
    const[selectedUf, setSelectedUf] = useState('0')
    const[selectedCity, setSelectedCity] = useState('0') 
    const[city, setCity] = useState<ArrayObj[]>([])


    useEffect(() => {
        axios.get<IBGEResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then( response => {
            const uf = response.data.map(uf => ({ label: uf.sigla, value: uf.sigla }))
            setUf(uf)
        })
    },[])

    useEffect(() => {
      if(selectedUf === '0') return 
      console.log(selectedUf)
      axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then( response => {
          const city = response.data.map(city => ({ label: city.nome, value: city.nome }))
          setCity(city)
      })
    },[selectedUf])

    const navigation = useNavigation()

    function handleNavigationtoPoints(){
      if(selectedUf === '0' && selectedCity === '0') return
        navigation.navigate('Points',{
          uf: selectedUf,
          city: selectedCity
        })
    }
    return(
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined }>
        <ImageBackground 
            source={require('../../assets/home-background.png')} 
            style={styles.container}
            imageStyle={{ width: 274, height:368}}
        >
            <View style={styles.main}>
                 <Image source={require('../../assets/logo.png')} />
                 <View>
                  <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
                  <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
                </View>
            </View>

            <View style={styles.footer}>
              <RNPickerSelect
              onValueChange={(value)=> setSelectedUf(value)}
              placeholder={{
                label: 'Selecione a UF'
              }}
              items={uf}
    
              />

               <RNPickerSelect
              onValueChange={(value) => setSelectedCity(value)}
              placeholder={{
                label: ''
              }}
              items={city}
              />
              {/* <TextInput 
                style={styles.input}
                placeholder='Digite a Uf'
                maxLength={2}
                autoCapitalize="characters"
                autoCorrect={false}
                value={uf}
                onChangeText={setUf}
              />

              <TextInput 
                style={styles.input}
                placeholder='Digite a Cidade'
                autoCorrect={false}
                value={city}
                onChangeText={setCity}
              /> */}
                <RectButton style={styles.button} onPress={handleNavigationtoPoints}>
                    <View style={styles.buttonIcon}>
                       <Icon name='arrow-right' color='#fff' size={24}></Icon>
                    </View>
                    <Text style={styles.buttonText}>Entrar</Text>
                </RectButton>
            </View>
        </ImageBackground>
      </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
    },
  
    title: {
      color: '#322153',
      fontSize: 32,
      fontFamily: 'Ubuntu_700Bold',
      maxWidth: 260,
      marginTop: 64,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
      fontFamily: 'Roboto_400Regular',
      maxWidth: 260,
      lineHeight: 24,
    },
  
    footer: {},
  
    select: {},
  
    input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },
  
    button: {
      backgroundColor: '#34CB79',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },
  
    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    }
  });

export default Home
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, CheckBox, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Read from './produto/read'

const Stack = createStackNavigator()

function Cart(props) {
  console.log("cart->", Read)
  const [cart, setCart] = useState([])

  useEffect(() => {
    const cart = props.cart || []

    setCart(cart)
  }, [])

  const removeCart = (data) => {
    props.removeCart(data.id)
    const newCart = cart.filter(c => c.id !== data.id)
    setCart([...newCart])
  }

  return(
    <ScrollView>
      <View style={styles.container}>
        {cart.map((data, index) =>
          <View key={index} style={styles.produtoContainer}>
            <Text style={styles.name}>{data.nome}</Text>
            <Text style={styles.listItem}> {data.preco}</Text>
            <Text style={styles.listItem}> {data.descricao}</Text>
            <View style={styles.checkboxContainer}>
              <CheckBox disabled={false} value={data.emPromocao}/>
              <Text style={styles.label}>Produto em promoção? </Text>
            </View>
            <Image source={{ uri: data.imagem }} style={{ width: 200, height: 200 }} />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  removeCart(data)
                }}
                style={{ ...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: 'tomato' }}>
                <Text style={styles.buttonText}>Remover do carrinho</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {cart.length > 0 ?
          <Text style={styles.buttonText}>Total a pagar: {cart
            .map(el => el.preco.replace(',','.'))
            .reduce((acc, curr) => parseFloat(curr) + parseFloat(acc))}
          </Text> : null
        }
      </View>

    </ScrollView>
  )
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#7159c1',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="Seu carrinho" component={Cart} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    width: '100%'
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    fontSize: 16
  },
  buttonUpdate: {
    color: 'white',
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: 16
  },
  buttonText: {
    color: 'white',
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: 16
  },
  title:{
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center'
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16
  },
  listItem: {
    fontSize: 16
  },
  produtoContainer: {
    marginBottom: 25,
    elevation: 4,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 6,
    borderTopWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    width: '100%'
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center"
  },
  label: {
    margin: 8,
  }
})

export default Cart

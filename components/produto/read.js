import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, CheckBox, Image, Dimensions  } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Create from './create'
import Delete from './delete'
import Update from './update'
import Cart from '../cart'
import firebase from '../../firebaseconection'
import { useEffect } from 'react'

const Stack = createStackNavigator()

const screenWidth = Dimensions.get('window').width

function Read({}) {

  const [isCreateProdutoModalOpen, setIsCreateProdutoModalOpen] = useState(false)
  const [isDeleteProdutoModalOpen, setIsDeleteProdutoModalOpen] = useState(false)
  const [isUpdateProdutoModalOpen, setIsUpdateProdutoModalOpen] = useState(false)
  const [isCartModalOpen, setIsCartModalOpen] = useState(false)
  const [produtos, setProdutos] = useState([])
  const [cart, setCart] = useState([])
  const [selectedProduto, setSelectedProduto] = useState(false)

  const toggleCreateProduto = () => {
    setIsCreateProdutoModalOpen(!isCreateProdutoModalOpen)
  }

  useEffect(() => {
    firebase.db.collection('produtos').onSnapshot(querySnapshot => {
      const produtos = []

      querySnapshot.docs.forEach(doc => {
        produtos.push({ ...doc.data(), id: doc.id })
      })

      setProdutos(produtos)
    })
  }, [])

  const createProduto = (data) => {
    data.id = produtos.length + 1
    createProdutoFirebase(data)
    // setProdutos([data, ...produtos])
  }

  const createProdutoFirebase = async ({ nome, preco, descricao, emPromocao, imagem }) => {
    try {
      await firebase.db.collection('produtos').add({
        nome,
        preco,
        descricao,
        emPromocao,
        imagem
      })
      alert('Produto cadastrado')
    } catch (error) {
      alert(error)
    }
  }

  const updateProduto = async (data) => {
    try {
      const dbRef = firebase.db.collection('produtos').doc(data.id)
      await dbRef.set(data)

      setProdutos(produtos.map(cli => cli.id == produto.id ? data : cli))
      alert('Produto atualizado')
    } catch (error) {
      alert(error)
    }
  }

  const deleteProduto = async (id) => {
    try {
      const dbRef = firebase.db.collection('produtos').doc(id)
      await dbRef.delete()
      alert('Produto deletado')
    } catch (error) {
      alert(error)
    }

    removeCart(id)
  }

  const toggleDeleteProdutoModal = () => {
    setIsDeleteProdutoModalOpen(!isDeleteProdutoModalOpen)
  }
  
  const toggleUpdateProdutoModal = () => {
    setIsUpdateProdutoModalOpen(!isUpdateProdutoModalOpen)
  }
  
  const toggleCartModal = () => {
    setIsCartModalOpen(!isCartModalOpen)
  }

  const addCart = (data) => {
    if (cart.find(c => c.id === data.id)) {
      return setCart(cart)
    }

    setCart([data, ...cart])
  }

  const removeCart = (id) => {
    setCart(cart.filter(c => c.id !== id))
  }

  return(
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={toggleCreateProduto}
          style={styles.button}>
          <Text
            style={{ ...styles.buttonText }}>
              Cadastrar Produto
          </Text>
        </TouchableOpacity>
        
        {produtos.map((data, index) =>
          <View key={index} style={styles.produtoContainer}>
            <Text style={styles.name}>{data.nome}</Text>
            <Text style={styles.listItem}> R$ {data.preco}</Text>
            <Text style={styles.listItem}> {data.descricao}</Text>
            <View style={styles.checkboxContainer}>
              <CheckBox disabled={false} value={data.emPromocao}/>
              <Text style={styles.label}>Produto em promoção? </Text>
            </View>
            {data.imagem ? 
              <Image source={{ uri: data.imagem }} style={{ width: 200, height: 200 }} />
              : null
            }
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                onPress={() => {
                  toggleUpdateProdutoModal()
                  setSelectedProduto(data)
                }}
                style={{ ...styles.button, marginVertical: 0, backgroundColor: '#7159c1' }}>
                <Text style={styles.buttonText }>Atualizar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  toggleDeleteProdutoModal()
                  setSelectedProduto(data)
                }}
                style={{ ...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: 'tomato' }}>
                <Text style={styles.buttonText}>Deletar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  addCart(data)
                }}
                style={{ ...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: 'green' }}>
                <Text style={styles.buttonText}>Carrinho</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <TouchableOpacity
          onPress={toggleCartModal}
          style={styles.buttonCart}>
          {isCartModalOpen ? 
          <Text
            style={{ ...styles.buttonText }}>
              Fechar carrinho
          </Text> :
          <Text
            style={{ ...styles.buttonText }}>
              Abrir carrinho
          </Text>}
        </TouchableOpacity>

        {isCreateProdutoModalOpen ? <Create
          isOpen={isCreateProdutoModalOpen}
          closeModal={toggleCreateProduto}
          createProduto={createProduto}
        /> : null}

        {isUpdateProdutoModalOpen ? <Update
          isOpen={isUpdateProdutoModalOpen}
          closeModal={toggleUpdateProdutoModal}
          selectedProduto={selectedProduto}
          updateProduto={updateProduto}
        /> : null}

        {isDeleteProdutoModalOpen ? <Delete
          isOpen={isDeleteProdutoModalOpen}
          closeModal={toggleDeleteProdutoModal}
          selectedProduto={selectedProduto}
          deleteProduto={deleteProduto}
        /> : null}

        {isCartModalOpen ? <Cart
          isOpen={isCartModalOpen}
          closeModal={toggleCartModal}
          cart={cart}
          removeCart={removeCart}
        /> : null}
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
        <Stack.Screen name="Lista de Produtos" component={Read} />
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
  buttonCart: {
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
    textAlign: 'center',
    padding: 5,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16
  },
  listItem: {
    fontSize: 16,
    padding: 5,
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

export default App

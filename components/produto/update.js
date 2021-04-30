import React, { useState, useEffect } from 'react'
import { Modal, Button, View, Text, TextInput, StyleSheet, TouchableOpacity, CheckBox, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

const Update = (props) => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result)

    if (!result.cancelled) {
      handleChange(result.uri, "imagem")
    }
  }

  const state = {
    nome: null,
    preco: null,
    descricao: null,
    emPromocao: false,
    imagem: null
  }

  const [produto, setProduto] = useState(state)
  const { isOpen, closeModal } = props

  useEffect(() => {
    const data = {
      nome: props.selectedProduto.nome,
      preco: props.selectedProduto.preco,
      descricao: props.selectedProduto.descricao,
      emPromocao: props.selectedProduto.emPromocao,
      imagem: props.selectedProduto.imagem,
      id: props.selectedProduto.id
    }
    setProduto(data)
  }, [])

  const handleChange = (value, name) => {
    setProduto({ ...produto, [name]: value })
  }

  const updateProduto = () => {
    props.updateProduto({
      nome: produto.nome,
      preco: produto.preco,
      descricao: produto.descricao,
      emPromocao: produto.emPromocao,
      imagem: produto.imagem,
      id: produto.id
    })
    props.closeModal()
  }

  return (
    <Modal
      visible={isOpen}
      onRequestClose={closeModal}
      animationType="slide"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Editar Produto</Text>

        <TextInput
          placeholder="Digite o nome: "
          style={styles.textBox}
          value={produto.nome}
          onChangeText={(text) => handleChange(text, "nome")}
        />

        <TextInput
          placeholder="Digite a idade: "
          style={styles.textBox}
          value={produto.preco}
          onChangeText={(text) => handleChange(text, "preco")}
          keyboardType="numeric"
        />

        <TextInput
          multiline={true}
          numberOfLines={4}
          placeholder="Digite a descricao: "
          style={styles.textBox}
          value={produto.descricao}
          onChangeText={(text) => handleChange(text, "descricao")}
        />

        <View style={styles.checkboxContainer}>
          <CheckBox
            disabled={false}
            value={produto.emPromocao}
            onValueChange={(value) => handleChange(value, "emPromocao")}
          />
          <Text style={styles.label}>Produto em promoção? </Text>
        </View>

        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Button title="Pick an image from camera roll" onPress={pickImage} />
          {produto.imagem && <Image source={{ uri: produto.imagem }} style={{ marginTop: 10, width: 200, height: 200 }} />}
        </View>
        
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={updateProduto}
                style={{ ...styles.button, marginVertical: 0, backgroundColor: '#349291' }}>
                <Text style={styles.buttonText}>Atualizar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={closeModal}
                style={{ ...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato" }}>
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
        </View>

      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20
  },
  textBox: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "rgba(0,0,0,0.3)",
    marginBottom: 15,
    fontSize: 18,
    padding: 10
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  button: {
    borderRadius: 5,
    marginVertical: 20,
    alignSelf: 'flex-start',
    backgroundColor: "gray"
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center"
  },
  buttonText: {
    color: "white",
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: 16
  }
})

export default Update

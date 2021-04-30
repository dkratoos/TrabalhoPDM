import React, {useState, useEffect } from 'react'
import {
  StyleSheet,
  Button,
  Text,
  View,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
  Platform,
  Image,
  CheckBox,
  AsyncStorage
} from 'react-native'

import { TextInput } from 'react-native-gesture-handler'
import * as ImagePicker from 'expo-image-picker'
import * as yup from 'yup'
import { Formik } from 'formik'

const Create = (props) => {
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
          alert('Desculpe, precisamos das permissões de acesso a câmera!')
        }
      }
    })()
  }, [])

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

  let validationSchema = yup.object().shape({
    nome: yup.string().required("É necessário preencher o campo nome"),
    preco: yup.number()
      .required("É necessário preencher o campo preço")
      .positive("O campo preço precisa ser positivo"),
    descricao: yup.string().required("É necessário preencher o campo descrição")
  })

  const state = {
    nome: null,
    preco: null,
    descricao: null,
    emPromocao: false,
    imagem: null,
    id: 0
  }

  const [produto, setProduto] = useState(state)
  const { isOpen, closeModal } = props

  const handleChange = (value, nome) => {
    setProduto( {...produto, [nome]: value})
  }

  const createProduto = async (values) => {
    const newProduto = Object.assign({}, produto, values)
    props.createProduto(newProduto)
    props.closeModal()
  }

  return(
    <Modal
      visible={isOpen}
      onRequestClose={closeModal}
      animationType="slide"
    >
      <View style={styles.BackgroundContainer}>
        <Text style={styles.title}>Cadastrar novo Produto </Text>
        <Formik
          initialValues={{ nome: '', preco: '', descricao: '' }}
          onSubmit={(values, actions) => {
            createProduto(values)
          }}
          validationSchema={validationSchema}
        >
          {(formikProps) => (
            <React.Fragment>
              <View>
                <TextInput
                  name="nome"
                  placeholder="Produto"
                  style={styles.textBox}
                  onChangeText={formikProps.handleChange("nome")}
                  onBlur={formikProps.handleBlur("nome")}
                  value={formikProps.values.nome}
                  autoFocus
                />
                {formikProps.errors.nome && formikProps.touched.nome &&
                  <Text style={{ color: 'red' }}>
                    {formikProps.touched.nome && formikProps.errors.nome}
                  </Text>
                }
              </View>

              <View>
                <TextInput
                  name="preco"
                  placeholder="Preço"
                  style={styles.textBox}
                  onChangeText={formikProps.handleChange("preco")}
                  onBlur={formikProps.handleBlur('preco')}
                  value={formikProps.values.preco}
                  keyboardType="numeric"
                />

                {formikProps.errors.preco && formikProps.touched.preco&&
                  <Text style={{ color: 'red' }}>
                    {formikProps.touched.preco && formikProps.errors.preco}
                  </Text>
                }
              </View>

              <View>
                <TextInput
                  name="descricao"
                  multiline={true}
                  numberOfLines={4}
                  placeholder="Informe a descrição do produto"
                  style={styles.textBox}
                  onChangeText={formikProps.handleChange("descricao")}
                  onBlur={formikProps.handleBlur("descricao")}
                  value={formikProps.values.descricao}
                />
                {formikProps.errors.descricao && formikProps.touched.descricao &&
                  <Text style={{ color: 'red' }}>
                    {formikProps.touched.descricao && formikProps.errors.descricao}
                  </Text>
                }
              </View>

              <View style={styles.checkboxContainer}>
                <CheckBox
                  disabled={false}
                  value={produto.emPromocao}
                  onValueChange={(value) => handleChange(value, "emPromocao")}
                />
                <Text style={styles.label}>Produto em promoção? </Text>
              </View>

              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Button style={styles.imagemPicker} title="Escolha a imagem do produto" onPress={pickImage} />
                {produto.imagem && <Image source={{ uri: produto.imagem }} style={{ marginTop: 10, width: 200, height: 200 }} />}
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  disabled={!formikProps.isValid}
                  onPress={formikProps.handleSubmit}
                  style={{...styles.button, backgroundColor: '#349291', marginVertical: 0}}
                  >
                    <Text style={styles.buttonText}>Salvar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={closeModal}
                  style={{...styles.button, marginVertical: 0, marginLeft: 10, backgroundColor: "tomato"}}
                  >
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>  
              </View>

            </React.Fragment>
          )}
        </Formik>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  BackgroundContainer: {
    padding: 15
  },
  title:{
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
  },
  label: {
    margin: 8,
  }
})

export default Create

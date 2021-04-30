import React, { useState } from 'react'

import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native'

const Delete = (props) => {
  const { isOpen, closeModal, selectedProduto } = props

  const deleteProduto = () => {
    props.deleteProduto(props.selectedProduto.id)
    props.closeModal()
  }

  return (
    <Modal
      visible={isOpen}
      onRequestClose={closeModal}
      animationType="slide"
      borderWidth= "0"
    >
      <View style={styles.BackgroundContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Você tem certeza que deseja excuir {selectedProduto.nome}?</Text>
          <Text style={styles.subTitle}>Aperte o botão OK.</Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
                onPress={deleteProduto}>
                <Text style={{ ...styles.buttonText, color: '#349291' }}>OK</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={closeModal}>
                <Text style={{ ...styles.buttonText, color: "tomato" }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default Delete

const styles = StyleSheet.create({
  BackgroundContainer: {
    padding: 15,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0,
  },
  container: {
    width: "90%",
    padding: 15,
    maxHeight: "100%",
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 4,
    borderRadius: 6,
    borderWidth: 0,
  },
  title: {
    fontWeight: "bold",
    fontSize: 17,
    marginBottom: 5
  },
  subTitle: {
    fontSize: 16
  },
  textBox: {
    marginBottom: 15,
    fontSize: 18,
    padding: 10
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignSelf: "flex-end",
    borderWidth: 0,
  },
  buttonText: {
    color: "tomato",
    fontSize: 17
  }
})

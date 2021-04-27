import React, { Component } from 'react';
import{
    Text,
    View,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

import { connect } from 'react-redux';
import {modificaEstado, modificaNomeCliente, modificaEmailCompra, modificaDataNascCompra} from '../actions/CompraActions';

class Clientes extends Component {
    _selecionaCliente(){
        this.props.modificaEstado(2);
        this.props.modificaNomeCliente(this.props.cliente.nome);
        this.props.modificaEmailCompra(this.props.cliente.email);
        this.props.modificaDataNascCompra(this.props.cliente.dataNasc);
        
    }
    render() {
        return(
            <TouchableHighlight
        onPress={ () =>  this._selecionaCliente() }  underlayColor="white"
        >
        <View style={styles.cliente}> 
        <View style={styles.detalhesCliente}>
        <Text style={styles.nome}>{this.props.cliente.nome}</Text>
        <Text style={styles.txtDetalhes}>{this.props.cliente.email}</Text>
        <Text style={styles.txtDetalhes}>{this.props.cliente.dataNasc}</Text>
        </View>
        </View>
        </TouchableHighlight>
        );
    }
}


const mapStateToProps = state => (
    {
      escolha: state.CompraReducer.escolha,
      nomeCliente: state.CompraReducer.nomeCliente,
      emailCompra: state.CompraReducer.emailCompra,
      dataNascCompra: state.CompraReducer.dataNascCompra,
    }
  )
  
  
  
  export default connect(mapStateToProps,{modificaEstado, modificaNomeCliente, modificaEmailCompra, modificaDataNascCompra})(Clientes)

const styles = StyleSheet.create({
    cliente:{
        backgroundColor: '#FFF',
        borderWidth: 0.5,
        borderColor:'#999',
        margin: 10,
        padding:10
    },
    detalhesCliente: {
        flex:1
    },
    nome:{
        fontSize:18,
        color: 'blue',
        marginBottom: 5
    },
    txtDetalhes: {
        fontSize:16
    }
})
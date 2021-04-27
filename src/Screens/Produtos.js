import React, { Component } from 'react';
import{
    Text,
    View,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

import { connect } from 'react-redux';
import {modificaEstado, modificaCompra, modificaQtde, modificaUnidadeComprada} from '../actions/CompraActions';

class Produtos extends Component {

    
    _selecionaCliente2(){
        this.props.modificaEstado(3);
        this.props.modificaQtde(this.props.produto.quantidade);

    
        this.props.modificaCompra(this.props.produto.nome);
        
        this.props.modificaUnidadeComprada(this.props.produto.unidade);

        
        
    }
    render() {
        return(
            <TouchableHighlight
        onPress={ () =>  this._selecionaCliente2() }  underlayColor="white"
        >
        <View style={styles.produto}> 
        <View style={styles.detalhesProduto}>
        <Text style={styles.nome}>{this.props.produto.nome}</Text>
        <Text style={styles.txtDetalhes}>Quantidade: {this.props.produto.quantidade}</Text>
        <Text style={styles.txtDetalhes}>Unidade: {this.props.produto.unidade}</Text>
        </View>
        </View>
        </TouchableHighlight>
        );
    }
}

const mapStateToProps = state => (
    {
        escolha: state.CompraReducer.escolha,
        compra: state.CompraReducer.compra,
        qtde: state.CompraReducer.qtde,
        unidadeComprada: state.CompraReducer.unidadeComprada,
        nomeCliente: state.CompraReducer.nomeCliente,
      email: state.CompraReducer.email,
      dataNascCompra: state.CompraReducer.dataNascCompra
    }
  )
  
  
  
  export default connect(mapStateToProps,{modificaEstado, modificaCompra, modificaQtde, modificaUnidadeComprada})(Produtos)

const styles = StyleSheet.create({
    produto:{
        backgroundColor: '#FFF',
        borderWidth: 0.5,
        borderColor:'#999',
        margin: 10,
        padding:10
    },
    detalhesProduto: {
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
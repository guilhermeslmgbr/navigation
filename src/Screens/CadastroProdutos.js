import React, {Component} from 'react';
import { View, Text, TextInput, Button, StyleSheet,TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import { modificaNome2, modificaQuantidade, modificaUnidade, cadastraProduto } from '../actions/ProdutoActions';
import { TextInputMask } from 'react-native-masked-text'


class CadastroProdutos extends Component{

    _cadastraProduto(){
        const { nome, quantidade, unidade} = this.props;
        this.props.cadastraProduto({nome, quantidade, unidade});
    }

    render(){ 
    return(
        <View style={{ flex: 1, padding:10}}>
        <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
            <Text style={{ fontSize:25}}>Cadastro de Produtos</Text>
        </View>
        <View style={{flex: 2}}>
            <TextInput 
            value={this.props.nome} 
            style={styles.campos}
             placeholder='Nome'
              onChangeText={ texto => this.props.modificaNome2(texto)}
              />
            <TextInputMask
            type={'only-numbers'} 
            value={this.props.quantidade} 
            style={styles.campos} 
            placeholder='Quantidade' 
            onChangeText={ texto => this.props.modificaQuantidade(texto)}
            />
            <TextInput 
            value={this.props.unidade} 
            style={styles.campos}
            placeholder='Unidade' 
            onChangeText={ texto => this.props.modificaUnidade(texto)}
            />
        </View>
        <View style={{flex: 2}}>

        <TouchableOpacity style={styles.estiloBotao} onPress={() => this._cadastraProduto()}>
        <Text style ={styles.estiloTextoBotao}>Cadastrar</Text>
    </TouchableOpacity>
                        
        </View>
    </View>
    )
    }
}

const mapStateToProps = state =>(
    {
        nome: state.ProdutoReducer.nome,
        quantidade: state.ProdutoReducer.quantidade,
        unidade: state.ProdutoReducer.unidade
    }
)

export default connect(mapStateToProps, {modificaNome2, modificaQuantidade, modificaUnidade, cadastraProduto})(CadastroProdutos);





const styles = StyleSheet.create({
    campos: {
        height: 60,
        marginRight: 10,
        fontSize: 18,
        backgroundColor: 'white',
        fontWeight:'bold',
        color:'#000',
        flex: 1, 
        textAlign: "left",
        marginLeft:15,
        marginRight:15,
        marginTop:60
    },
    estiloBotao: {
        padding: 20,
        alignSelf: 'stretch',
        marginLeft:15,
        marginRight: 15,
        backgroundColor: 'white',
        marginTop:50
      },
      estiloTextoBotao: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        backgroundColor: 'white'
      }
})
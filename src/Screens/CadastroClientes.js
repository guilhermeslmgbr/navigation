import React, {Component} from 'react';
import { View, Text, TextInput, Button, StyleSheet,TouchableOpacity} from 'react-native';
import { connect } from 'react-redux';
import { modificaNome, modificaEmail, modificaDataNasc, cadastraCliente } from '../actions/ClienteActions';
import { TextInputMask } from 'react-native-masked-text'

class CadastroClientes extends Component{

    _cadastraCliente(){
        const { nome, email, dataNasc} = this.props;
        this.props.cadastraCliente({nome, email, dataNasc});
    }

    render() { 
    return(
        <View style={{ flex: 1, padding:10}}>
            <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                <Text style={{ fontSize:25}}>Cadastro de Clientes</Text>
            </View>
            <View style={{flex: 2}}>
                <TextInput 
                value={this.props.nome} 
                style={styles.campos} 
                placeholder='Nome' 
                onChangeText={ texto => this.props.modificaNome(texto)}
                />
                <TextInput 
                value={this.props.email} 
                style={styles.campos} 
                placeholder='E-mail'
                 onChangeText={ texto => this.props.modificaEmail(texto)}
                 />
                <TextInputMask 
                  type={'datetime'}
                  options={{
                    format: 'DD-MM-AAAA'
                  }}
                value={this.props.dataNasc}
                 style={styles.campos}
                 placeholder='Data de Nascimento' 
                 onChangeText={ texto => this.props.modificaDataNasc(texto)}
                 />
                
      





                <Text style={styles.erroCadastro}>{this.props.erroCadastro}</Text>
            </View>
            <View style={{flex: 2}}>

            <TouchableOpacity style={styles.estiloBotao} onPress={() => this._cadastraCliente()}>
            <Text style ={styles.estiloTextoBotao}>Cadastrar</Text>
        </TouchableOpacity>
                            
            </View>
        </View>
    )
    }
}

const mapStateToProps = state =>(
    {
        nome: state.ClienteReducer.nome,
        email: state.ClienteReducer.email,
        dataNasc: state.ClienteReducer.dataNasc,
        erroCadastro: state.ClienteReducer.erroCadastro
    }
)

export default connect(mapStateToProps, { modificaNome, modificaEmail, modificaDataNasc, cadastraCliente })(CadastroClientes);

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
      },
      erroCadastro: {
        color: '#ff0000',
        fontSize: 18,
        fontWeight: "bold"
      }
})
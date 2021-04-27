import React, {useState, Component} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, ScrollView, TouchableHighlight, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clientes from './Clientes';
import Produtos from './Produtos';
import { connect } from 'react-redux';
import {modificaEstado, modificaQuantidadeComprada, modificaData, modificaBairro, modificaRua, modificaNumero, cadastraCompra} from '../actions/CompraActions';
import { TextInputMask } from 'react-native-masked-text'

class Compra extends Component {


  constructor(props) {
    super(props)
  
    
    this.state = { escolha: 1, vetorEmails:[], listaClientes:[], vetorNomeProdutos:[], listaProdutos:[], melhorComprador:'', melhorVenda:''}
  }

    


   async componentWillMount(){
    
    const Buscar = async(chave) => {
      const melhorComprador = await AsyncStorage.getItem('#melhorComprador');
      if(melhorComprador == undefined){
        this.setState({melhorComprador: '-'})
      }
      else{ 
        let jsonMelhorComprador = JSON.parse(melhorComprador)
        let nomeMelhorComprador = jsonMelhorComprador.nome.toString();
        this.setState({melhorComprador:nomeMelhorComprador})
      }
      const melhorVenda = await AsyncStorage.getItem('#melhorVenda');
      if(melhorVenda == undefined){
        this.setState({melhorVenda:'-'})
      }
      else{
        let jsonMelhorVenda = JSON.parse(melhorVenda);
        let nomeMelhorVenda = jsonMelhorVenda.nome.toString();
        this.setState({melhorVenda:nomeMelhorVenda})
      }
    }

    Buscar('#melhorVenda');
    Buscar('#melhorComprador');
    



    const BuscarElementos = async () => {  
    let emails = await AsyncStorage.getAllKeys()
    let emailsFiltro = [];
    let nomeProduto = [];
    for(let i=0;i<emails.length;i++){
     if(emails[i].indexOf('@')!=-1){
      emailsFiltro.push(emails[i])
     }
     else{
       if(emails[i].indexOf('#')==-1){ 
       nomeProduto.push(emails[i])
       }
     }
    }
    this.setState({vetorEmails:emailsFiltro});
    this.setState({vetorNomeProdutos:nomeProduto});
  }
  
    const BuscarElemento = async (chave) => {
    const valor = await AsyncStorage.getItem(chave)
    return JSON.parse(valor);
  }
  
  await BuscarElementos();
  for (let i=0; i<this.state.vetorEmails.length; i++){
      let cliente = await BuscarElemento(this.state.vetorEmails[i]);
      this.setState({listaClientes:this.state.listaClientes.concat(cliente)})
  }
  
  for (let i=0; i<this.state.vetorNomeProdutos.length; i++){
    let produto = await BuscarElemento(this.state.vetorNomeProdutos[i]);
    this.setState({listaProdutos:this.state.listaProdutos.concat(produto)})
    
  }
  
  }


  async recarrega(){
    this.setState({listaProdutos:[]})
    this.setState({listaClientes:[]})
    const BuscarElementos = async () => {  
      let emails = await AsyncStorage.getAllKeys()
      let emailsFiltro = [];
      let nomeProduto = [];
      for(let i=0;i<emails.length;i++){
       if(emails[i].indexOf('@')!=-1){
        emailsFiltro.push(emails[i])
       }
       else{
         if(emails[i].indexOf('#')==-1){ 
         nomeProduto.push(emails[i])
         }
       }
      }
      this.setState({vetorEmails:emailsFiltro});
      this.setState({vetorNomeProdutos:nomeProduto});
    }
    
      const BuscarElemento = async (chave) => {
      const valor = await AsyncStorage.getItem(chave)
      return JSON.parse(valor);
    }
    
    await BuscarElementos();
    for (let i=0; i<this.state.vetorEmails.length; i++){
        let cliente = await BuscarElemento(this.state.vetorEmails[i]);
        this.setState({listaClientes:this.state.listaClientes.concat(cliente)})
    }
    
    for (let i=0; i<this.state.vetorNomeProdutos.length; i++){
      let produto = await BuscarElemento(this.state.vetorNomeProdutos[i]);
      this.setState({listaProdutos:this.state.listaProdutos.concat(produto)})
      
    }

    const Buscar = async(chave) => {
      const melhorComprador = await AsyncStorage.getItem('#melhorComprador');
      if(melhorComprador == undefined){
        this.setState({melhorComprador: '-'})
      }
      else{ 
        let jsonMelhorComprador = JSON.parse(melhorComprador)
        let nomeMelhorComprador = jsonMelhorComprador.nome.toString();
        this.setState({melhorComprador:nomeMelhorComprador})
      }
      const melhorVenda = await AsyncStorage.getItem('#melhorVenda');
      if(melhorVenda == undefined){
        this.setState({melhorVenda:'-'})
      }
      else{
        let jsonMelhorVenda = JSON.parse(melhorVenda);
        let nomeMelhorVenda = jsonMelhorVenda.nome.toString();
        this.setState({melhorVenda:nomeMelhorVenda})
      }
    }

    Buscar('#melhorVenda');
    Buscar('#melhorComprador');

  }


escolheTela(){
 

    if(this.props.escolha == 0)
    return this.renderTela1();
    else if(this.props.escolha == 1)
    return this.renderTela2();
    else if(this.props.escolha == 2)
    return this.renderTela3();
    else if(this.props.escolha == 3)
    return this.renderTela4();
  
}

mudaTela1(){
  this.recarrega();
  this.props.modificaEstado(1);
}

voltaTela1(){
  this.recarrega();
  this.props.modificaEstado(0);
}

voltaTela2(){
  this.recarrega();
  this.props.modificaEstado(1);
}

voltaTela3(){
  this.recarrega();
  this.props.modificaEstado(2);
}

_cadastraCompra(){
  this.recarrega();
  const {quantidadeComprada, data, bairro, rua, numero, nomeCliente, emailCompra, dataNascCompra, compra, qtde, unidadeComprada} = this.props;
  this.props.cadastraCompra({quantidadeComprada, data, bairro, rua, numero, nomeCliente, emailCompra, dataNascCompra, compra, qtde, unidadeComprada});
}

renderTela1(){
  return(
    <View style={styles.estiloTela2}>
        <View style={styles.estiloTela2Meio}>
  <Text style={styles.estiloTextoTitulo}>MELHOR COMPRADOR</Text>
        <Text style={styles.estiloTexto}>{this.state.melhorComprador}</Text>
        <Text style={styles.estiloLinha}> ------------------------</Text>
        <Text style={styles.estiloTextoTitulo}>MELHOR VENDA</Text>
  <Text style={styles.estiloTexto}>{this.state.melhorVenda}</Text>
    </View>
    
    <View style={styles.estiloDivBotao2}> 
    <TouchableOpacity style={styles.estiloBotao} onPress={() => this.mudaTela1()}>
    <Text style ={styles.estiloTextoBotao}>Comprar</Text>
</TouchableOpacity>
    
    </View>
    <View style={styles.estiloDepoisDoBotao2}>
    
    </View>
    
    </View>

  )
}

renderTela2(){
  return(
 
    <View>
    <ScrollView style={{ backgroundColor:'#DDDDDD'}}>
      
    <Text style={{textAlign:'center', flex:1, marginTop:50, fontSize:20}}>Escolha o Cliente</Text>
    <TouchableOpacity style={styles.estiloBotao2} onPress={() => this.voltaTela1()}>
        <Text style ={styles.estiloTextoBotao2}>&#8592;</Text>
    </TouchableOpacity>

    {this.state.listaClientes.map(cliente => (<Clientes key={cliente.email} cliente={cliente}/>))}
    </ScrollView>
    </View>
  )
}

renderTela3(){
  
  return(
    <View>
    <ScrollView style={{ backgroundColor:'#DDDDDD'}}>
    <Text style={{textAlign:'center', flex:1, marginTop:50, fontSize:20}}>Escolha o Produto</Text>
    <TouchableOpacity style={styles.estiloBotao2} onPress={() => this.voltaTela2()}>
        <Text style ={styles.estiloTextoBotao2}>&#8592;</Text>
    </TouchableOpacity>

    {this.state.listaProdutos.map(produto => (<Produtos key={produto.nome} produto={produto}/>))}
    </ScrollView>
    </View>
  )
}

renderTela4(){
  return(
    <ScrollView style={{ flex: 1, padding:10}}>
        <View style={{flex: 1, justifyContent:'center', alignItems:'center', paddingTop: 30}}>
            <Text style={{ fontSize:25, marginBottom:20}}>Informações da compra</Text>
        </View>
        <TouchableOpacity style={styles.estiloBotao2} onPress={() => this.voltaTela3()}>
        <Text style ={styles.estiloTextoBotao2}>&#8592;</Text>
    </TouchableOpacity>
        <View style={{flex: 2}}>
            <TextInput 
            value={this.props.quantidadeComprada}
            style={styles.campos}
             placeholder='Quantidade do produto'
             onChangeText={ texto => this.props.modificaQuantidadeComprada(texto)}
              />
            <TextInputMask 
             type={'datetime'}
             options={{
               format: 'DD-MM-AAAA'
             }}
            value={this.props.data}
            style={styles.campos} 
            placeholder='Data da compra' 
            onChangeText={ texto => this.props.modificaData(texto)}
            />
            <TextInput
            value={this.props.bairro} 
            style={styles.campos}
            placeholder='Bairro' 
            onChangeText={ texto => this.props.modificaBairro(texto)}
            />
            <TextInput 
            value={this.props.rua}
            style={styles.campos}
            placeholder='Rua' 
            onChangeText={ texto => this.props.modificaRua(texto)}
            />
            <TextInput 
            value={this.props.numero}
            style={styles.campos}
            placeholder='Número' 
            onChangeText={ texto => this.props.modificaNumero(texto)}
            />
        </View>
        <View style={{flex: 2}}>

        <TouchableOpacity style={styles.estiloBotao3} onPress={() => this._cadastraCompra()}>
        <Text style ={styles.estiloTextoBotao}>Comprar</Text>
    </TouchableOpacity>
                        
        </View>
    </ScrollView>
  )
}


    render () {
        return (
            <ScrollView>
            {this.escolheTela(this.state.escolha)}
            </ScrollView>
        )
    }
}


const mapStateToProps = state => (
  {
    escolha: state.CompraReducer.escolha,
    quantidadeComprada: state.CompraReducer.quantidadeComprada,
    data: state.CompraReducer.data,
    bairro: state.CompraReducer.bairro,
    rua: state.CompraReducer.rua,
    numero: state.CompraReducer.numero,

    nomeCliente: state.CompraReducer.nomeCliente,
    emailCompra: state.CompraReducer.emailCompra,
    dataNascCompra: state.CompraReducer.dataNascCompra,
    
    compra: state.CompraReducer.compra,
    qtde: state.CompraReducer.qtde,
    unidadeComprada: state.CompraReducer.unidadeComprada

    
  }
)



export default connect(mapStateToProps,{modificaEstado, modificaQuantidadeComprada, modificaData, modificaBairro, modificaRua, modificaNumero, cadastraCompra})(Compra)

const styles = StyleSheet.create({
    estiloTela2Meio: {
        backgroundColor: 'white',
        margin:50,
        paddingBottom: 5,
        paddingTop: 10,
      },
      estiloTextoTitulo: {
        fontSize:15,
        textAlign:'center',
        fontWeight: 'bold'
      },
      estiloTexto: {
        fontSize: 25,
        textAlign:'center',
        marginTop:5,
        fontWeight: 'bold'
      },
      estiloLinha:{
        alignSelf: 'center',
        fontWeight: 'bold'
      },
      estiloBotao: {
        padding: 20,
        alignSelf: 'stretch',
        marginLeft:50,
        marginRight: 50,
        backgroundColor: 'white',
        marginTop: 5
      },
      estiloTextoBotao: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
        alignSelf: 'center',
        backgroundColor: 'white'
      },
      estiloTextoBotao2: {
        color: '#000',
        fontSize: 40,
        fontWeight: 'bold',
        alignSelf: 'center'
      },
      estiloDepoisDoBotao2:{
        padding:20
      },
      estiloBotao2: {
        padding: 20,
        alignSelf: 'stretch',
        maxWidth: 100,
        fontSize:25,
        marginTop:-45
      },
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
        marginTop:30
    },
    estiloBotao3: {
      padding: 20,
      alignSelf: 'stretch',
      marginLeft:50,
      marginRight: 50,
      backgroundColor: 'white',
      marginTop: 40
    },

})
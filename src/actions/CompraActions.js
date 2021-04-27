import AsyncStorage from '@react-native-async-storage/async-storage';



export const modificaEstado = (numero) => {
    return{
        type: 'modifica_estado',
        payload: numero
    }
}

export const modificaQuantidadeComprada = (texto) => {
    return{
        type: 'modifica_quantidade_comprada',
        payload: texto
    }
}

export const modificaData = (texto) => {
    return{
        type: 'modifica_data',
        payload: texto
    }
}

export const modificaBairro = (texto) => {
    return{
        type: 'modifica_bairro',
        payload: texto
    }
}

export const modificaRua = (texto) => {
    return{
        type: 'modifica_rua',
        payload: texto
    }
}

export const modificaNumero = (texto) => {
    return{
        type: 'modifica_numero',
        payload: texto
    }
}



export const modificaNomeCliente = (texto) => {
    return{
        type: 'modifica_nome_cliente',
        payload: texto
    }
}

export const modificaEmailCompra = (texto) => {
    return{
        type: 'modifica_email_compra',
        payload: texto
    }
}

export const modificaDataNascCompra = (texto) => {
    return{
        type: 'modifica_data_nasc_compra',
        payload: texto
    }
}

export const modificaCompra = (texto) => {
    return{
        type: 'modifica_compra',
        payload: texto
    }
}

export const modificaQtde = (texto) => {
    return{
        type: 'modifica_qtde',
        payload: texto
    }
}

export const modificaUnidadeComprada = (texto) => {
    return{
        type: 'modifica_unidade_comprada',
        payload: texto
    }
}


export const cadastraCompra = ({nomeCliente, emailCompra, dataNascCompra , compra, qtde, unidadeComprada, quantidadeComprada, data, bairro, rua, numero }) => {
    return dispatch => {


       
   if(nomeCliente=='' || emailCompra=='' || dataNascCompra=='' || compra=='' || qtde=='' || unidadeComprada=='' || quantidadeComprada=='' || data=='' || bairro=='' || rua=='' || numero==''){
     alert("Há campo(s) não preenchido(s)")
  }
   else{ 
    if(data.length < 10 || data > 10 ){
        alert("data inválida")
    }
    else{ 
        if(parseInt(quantidadeComprada) < 1){
            alert("quantidade invalida");
        }
        else { 
    const Buscar = async (chave) => {
        const valor = await AsyncStorage.getItem(chave);
        return valor;
    } 

    function fabricaProduto(nome, quantidade, unidade){          
        let Produto ={};
        Produto.nome=nome;
        Produto.quantidade=quantidade;
        Produto.unidade=unidade;
        return Produto;
    }

    function fabricaMelhorProduto(nome, quantidade, data){
        let Comprador = {};
        Comprador.nome = nome;
        Comprador.quantidade = quantidade;
        Comprador.data = data;
        return Comprador;
    }

    function fabricaMelhorCliente(nome, quantidade, data){
        let MelhorProduto = {};
        MelhorProduto.nome = nome;
        MelhorProduto.quantidade = quantidade;
        MelhorProduto.data = data;
        return MelhorProduto;
    }
   
    const Armazenar = (chave, valor) => {
        AsyncStorage.setItem(chave, valor)
    }

    

    function replaceData(data){
        let ano1=data.charAt(6);
        let ano2=data.charAt(7);
        let ano3=data.charAt(8);
        let ano4=data.charAt(9)
        let ano = ano1+ano2+ano3+ano4;
        let anoNumero = parseInt(ano);


        let mes1=data.charAt(3);
        let mes2=data.charAt(4);
        let mes = mes1+mes2;
        let mesNumero = parseInt(mes);


        let dia1=data.charAt(0);
        let dia2=data.charAt(1);
        let dia = dia1+dia2;
        let diaNumero = parseInt(dia);

        let novaData = new Date(anoNumero, mesNumero, diaNumero);
 
        return novaData;
    }
       
   if(parseInt(quantidadeComprada) > parseInt(qtde)){
       alert("Estoque insuficiente para a quantidade solicitada")
     
   }
   else{
       
       //COMPUTANDO A VENDA
       let CompraABuscar = compra.toLowerCase();
       let venda =  Buscar(CompraABuscar);
       Promise.resolve(venda).then(async function(value) {
        let itemComprado = value;               
        itemComprado = JSON.parse(itemComprado); 
        let estoque = parseInt(itemComprado.quantidade); 
        let comprado = parseInt(quantidadeComprada); //QUANTIDADE COMPRADA
        let diferenca = estoque - comprado;
        let nomeProduto = itemComprado.nome.toString();  //NOME DO PRODUTO COMPRADO
        let quantidadeProduto = diferenca.toString();      
        let unidadeProduto = itemComprado.unidade.toString();
        nomeProduto = nomeProduto.toLowerCase();
        let Produto = fabricaProduto(nomeProduto, quantidadeProduto, unidadeProduto);
        Armazenar(nomeProduto, JSON.stringify(Produto));


        //comprador tem: nome, quantidade e unidade
        //MELHOR COMPRADOR
      const melhorComprador = Buscar('#melhorComprador');
      Promise.resolve(melhorComprador).then(async function(value) {
        let quantidadeComprada = comprado.toString()
          if(value == undefined){
            let dateProdutoInserido = replaceData(data);
            let dataAtual = new Date();
            let anoAtual = dataAtual.getFullYear();
            anoAtual= anoAtual.toString();
            let anoAtualTexto = anoAtual;
            
            let mesAtual = dataAtual.getMonth();
            mesAtual+=1;
            let mesAtualTexto = mesAtual.toString();
            if(mesAtual < 10){
                mesAtualTexto = "0" + mesAtualTexto;
            }
            let diaAtual = dataAtual.getDate();
            diaAtualTexto = diaAtual.toString();
            if(diaAtual < 10){
                diaAtualTexto = "0" + diaAtualTexto;
            }
            let dataAtualTexto = diaAtualTexto + '-' + mesAtualTexto + '-'+ anoAtualTexto;


            let estaData = replaceData(dataAtualTexto);
            let diferencaTempo = estaData - dateProdutoInserido;
            
            if(diferencaTempo < 1296000000 && diferencaTempo > 0){                //MELHOR COMPRADOR DOS ULTIMOS 15 DIAS
                    let maiorProduto = fabricaMelhorCliente(nomeCliente, quantidadeComprada, data );
                    Armazenar('#melhorComprador', JSON.stringify(maiorProduto));
                    alert("melhor comprador atualizado!")  
            }
                
          }
          else{
              let buscarmelhorComprador = Buscar("#melhorComprador");
              Promise.resolve(buscarmelhorComprador).then(async function(value) {
                    let clienteTop = value;
                    let jsonClienteTop = JSON.parse(clienteTop);
                    let dateProdutoInserido = replaceData(data);
                    let dataAtual = new Date();
                    let anoAtual = dataAtual.getFullYear();
                    anoAtual= anoAtual.toString();
                    anoAtualTexto = anoAtual;
                    let mesAtual = dataAtual.getMonth();
                    mesAtual+=1;
                    let mesAtualTexto = mesAtual.toString();
                    if(mesAtual < 10){
                        mesAtualTexto = "0" + mesAtualTexto;
                    }
                    let diaAtual = dataAtual.getDate();
                    diaAtualTexto = diaAtual.toString();
                    if(diaAtual < 10){
                        diaAtualTexto = "0" + diaAtualTexto;
                    }
                    let dataAtualTexto = diaAtualTexto + '-' + mesAtualTexto + '-'+ anoAtualTexto;
                    let estaData = replaceData(dataAtualTexto);
                    let diferencaTempo = estaData - dateProdutoInserido;
                    if(diferencaTempo < 1296000000 && diferencaTempo > 0){                //MELHOR COMPRADOR DOS ULTIMOS 15 DIAS
                        let quantidadeMelhorComprador = jsonClienteTop.quantidade;
                        quantidadeMelhorComprador = parseInt(quantidadeMelhorComprador);
                        let diferencaMelhorEComprado = comprado - quantidadeMelhorComprador;
                        if(diferencaMelhorEComprado > 0 ){
                            let maiorProduto = fabricaMelhorCliente(nomeCliente, quantidadeComprada, data );
                            Armazenar('#melhorComprador', JSON.stringify(maiorProduto));
                            alert("melhor comprador atualizado!")  
                        }
                    }
                        
                    
              })

          }
    
    })
    //FIM MELHOR COMPRADOR


        //MELHOR PRODUTO
        let dataCorrente = new Date();
        let anoCorrente = dataCorrente.getFullYear();
        let mesCorrente = dataCorrente.getMonth();
        mesCorrente+=1;
        let ano1=data.charAt(6);
        let ano2=data.charAt(7);
        let ano3=data.charAt(8);
        let ano4=data.charAt(9)
        let ano = ano1+ano2+ano3+ano4;
        let anoNumero = parseInt(ano);
        let mes1=data.charAt(3);
        let mes2=data.charAt(4);
        let mes = mes1+mes2;
        let mesNumero = parseInt(mes);
        if(mesNumero==mesCorrente && anoNumero==anoCorrente){
            const melhorVenda = Buscar('#melhorVenda');
            Promise.resolve(melhorVenda).then(async function(value) {
                let quantidadeComprada = comprado.toString();
                if(value == undefined){
                    let melhorProduto = fabricaMelhorProduto(compra, quantidadeComprada, data );
                   Armazenar('#melhorVenda', JSON.stringify(melhorProduto));
                    alert("melhor produto atualizado");   
                }
                else{
                    let jsonMelhorVenda = JSON.parse(value);
                    let maiorQuantidade = parseInt(jsonMelhorVenda.quantidade);
                    if(comprado > maiorQuantidade){
                    let melhorProduto = fabricaMelhorProduto(compra, quantidadeComprada, data );
                   Armazenar('#melhorVenda', JSON.stringify(melhorProduto));
                    alert("melhor produto atualizado");
                    }
                 }
             })
        }
        //FIM MELHOR PRODUTO

      alert("Venda Realizada com successo!");
      dispatch ({ type:'cadastro_compra_sucesso' });

      });

      
    }
}
    }

   }

}

}


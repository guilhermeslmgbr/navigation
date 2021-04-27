import ProdutosStorage from '@react-native-async-storage/async-storage';

export const modificaNome2 = (texto) => {
    return {
        type: 'modifica_nome2',
        payload:texto
    }
}

export const modificaQuantidade = (texto) => {
    return {
        type: 'modifica_quantidade',
        payload:texto
    }
}

export const modificaUnidade = (texto) => {
    return {
        type: 'modifica_unidade',
        payload:texto
    }
}

export const cadastraProduto = ({nome, quantidade, unidade}) => {
    return dispatch => {

    
    const Armazenar = (chave, valor) => {
        ProdutosStorage.setItem(chave, valor)
    }

    function fabricaProduto(nome, quantidade, unidade){          
        let Produto ={};
        Produto.nome=nome;
        Produto.quantidade=quantidade;
        Produto.unidade=unidade;
        return Produto;
    }
    let nomeMinusculo = nome.toLowerCase();
    let Produto = fabricaProduto(nome, quantidade, unidade);
    

    

    if(nome=='' || quantidade=='' || unidade==''){
        alert("Há campo(s) não preenchido(s)")
    }
    else{ 
        if(nome.indexOf('#')!=-1 || nome.indexOf('@')!=-1 || nome.indexOf('!')!=-1  || nome.indexOf('$')!=-1  || nome.indexOf('%')!=-1  || nome.indexOf('^')!=-1  ||
        nome.indexOf('&')!=-1   || nome.indexOf('(')!=-1  || nome.indexOf(')')!=-1  || nome.indexOf('+')!=-1  || nome.indexOf('=')!=-1 ){
                    alert("nome inválido")
                }
                else{
                    if(parseInt(quantidade) < 1){
                        alert("quantidade inválida")
                    }
                    else{ 
                    Armazenar(nomeMinusculo, JSON.stringify(Produto));
                    alert("Produto cadastrado com sucesso!");
                    dispatch ({ type:'cadastro_produto_sucesso' });
                    }
                }
   
    }

}
}
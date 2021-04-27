const INITIAL_STATE = {
    escolha: 0,
    quantidadeComprada:0,
    data:'',
    bairro:'',
    rua:'',
    numero:'',
    nomeCliente:'',
    emailCompra:'',
    dataNascCompra:'',
    compra:'',
    qtde:'',
    unidadeComprada:''
}

export default (state = INITIAL_STATE, action) => {
    if(action.type == 'modifica_estado'){
        return {...state, escolha:action.payload}
    }

    if(action.type == 'modifica_quantidade_comprada'){
        return {...state, quantidadeComprada:action.payload}
    }

    if(action.type == 'modifica_data'){
        return {...state, data:action.payload}
    }

    if(action.type == 'modifica_bairro'){
        return {...state, bairro:action.payload}
    }

    if(action.type == 'modifica_rua'){
        return {...state, rua:action.payload}
    }

    if(action.type == 'modifica_numero'){
        return {...state, numero:action.payload}
    }



    if(action.type == 'modifica_nome_cliente'){
        return {...state, nomeCliente:action.payload}
    }

    if(action.type == 'modifica_email_compra'){
        return {...state, emailCompra:action.payload}
    }

    if(action.type == 'modifica_data_nasc_compra'){
        return {...state, dataNascCompra:action.payload}
    }

    if(action.type == 'modifica_compra'){
        return {...state, compra:action.payload}
    }

    if(action.type == 'modifica_qtde'){
        return {...state, qtde:action.payload}
    }

    if(action.type == 'modifica_unidade_comprada'){
        return {...state, unidadeComprada:action.payload}
    }

    if(action.type == 'cadastro_compra_sucesso'){
        return {...state, quantidadeComprada:0, data:'', bairro:'', rua:'', numero:'', escolha:0, nomeCliente:'', emailCompra:'', dataNascCompra:'', compra:'', qtde:'', unidadeComprada:'' }
    }
  
    return state;
}
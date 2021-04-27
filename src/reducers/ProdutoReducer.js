const INITIAL_STATE = {
    nome: '',
    quantidade:'',
    unidade:''
}

export default (state = INITIAL_STATE, action) => {

    if(action.type == 'modifica_nome2'){
        return {...state, nome:action.payload}
    }
    
    if(action.type == 'modifica_quantidade'){
        return {...state, quantidade:action.payload}
    }

    if(action.type == 'modifica_unidade'){
        return {...state, unidade:action.payload}
    }

    
    if(action.type == 'cadastro_produto_sucesso'){
        return {...state, nome:'', quantidade:'', unidade:''}
    }

    return state;
}
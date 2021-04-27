const INITIAL_STATE = {
    nome: '',
    email:'',
    dataNasc:''
}

export default (state = INITIAL_STATE, action) => {
    
    if(action.type == 'modifica_nome'){
        return {...state, nome:action.payload}
    }
    
    if(action.type == 'modifica_email'){
        return {...state, email:action.payload}
    }

    if(action.type == 'modifica_dataNasc'){
        return {...state, dataNasc:action.payload}
    }

    if(action.type == 'cadastro_cliente_sucesso'){
        return {...state, nome:'', email:'', dataNasc:''}
    }

    return state;
}
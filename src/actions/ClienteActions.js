import AsyncStorage from '@react-native-async-storage/async-storage';


export const modificaNome = (texto) => {
    return {
        type: 'modifica_nome',
        payload:texto
    }
}

export const modificaEmail = (texto) => {
    return {
        type: 'modifica_email',
        payload:texto
    }
}

export const modificaDataNasc = (texto) => {
    return {
        type: 'modifica_dataNasc',
        payload:texto
    }
}

export const cadastraCliente = ({nome, email, dataNasc}) => {
    return dispatch => {

    const Armazenar = (chave, valor) => {
        AsyncStorage.setItem(chave, valor)
    }

    function fabricaCliente(nome, email, dataNasc){          
        let Cliente ={};
        Cliente.nome=nome;
        Cliente.email=email;
        Cliente.dataNasc=dataNasc;
        return Cliente;
    }
    let emailMinusculo = email.toLowerCase();
    let Cliente = fabricaCliente(nome, email, dataNasc);
    

    




    if(nome=='' || email=='' || dataNasc==''){
        alert("Há campo(s) não preenchido(s)")
    }
     

    else{ 
        if(email.indexOf('@')==-1){
            alert("email inválido")
        }
        else{ 
            if(!email.includes('.com')){
                alert("email inválido")
            }
            else{ 
                if(email.indexOf('#')!=-1 || email.indexOf('!')!=-1  || email.indexOf('$')!=-1  || email.indexOf('%')!=-1  || email.indexOf('^')!=-1  ||
                email.indexOf('&')!=-1   || email.indexOf('(')!=-1  || email.indexOf(')')!=-1  || email.indexOf('+')!=-1  || email.indexOf('=')!=-1){
                    alert("email inválido")
                }
                else{ 
                    if(dataNasc.length < 10 || dataNasc > 10 ){
                        alert("data inválida")
                    }
                    else{ 
                        Armazenar(emailMinusculo, JSON.stringify(Cliente));
                        alert("Cliente cadastrado com sucesso!");
                        dispatch ({ type:'cadastro_cliente_sucesso' });
                    }
                }
        }
    }
    }


}
}


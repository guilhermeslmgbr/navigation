import { combineReducers } from 'redux';
import ClienteReducer from './ClienteReducer';
import ProdutoReducer from './ProdutoReducer';
import CompraReducer from './CompraReducer';


export default combineReducers({
    ClienteReducer: ClienteReducer,
    ProdutoReducer: ProdutoReducer,
    CompraReducer: CompraReducer
})
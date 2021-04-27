import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';

import reducers from './reducers';  


import  {NavigationContainer} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';


import Compra from './Screens/Compra';
import CadastroClientes from './Screens/CadastroClientes';
import CadastroProdutos from './Screens/CadastroProdutos';


const Drawer = createDrawerNavigator();

export default function MyDrawer() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Compra" component={Compra} />
        <Drawer.Screen name="Cadastro de Clientes" component={CadastroClientes} />
        <Drawer.Screen name="Cadastro de Produtos" component={CadastroProdutos} />

      </Drawer.Navigator>
      </NavigationContainer>
      </Provider>
    );
  }
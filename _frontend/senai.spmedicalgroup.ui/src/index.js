import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {Route, BrowserRouter as Router, Switch, Redirect} from "react-router-dom";
import ConsultasPaciente from "./pages/consultas/ConsultasPaciente";
import ConsultasMedico from "./pages/consultas/ConsultasMedico";
import Login from "./pages/login/Login";

import {UsuarioAutenticado} from "./services/auth";
import {parseJwt} from "./services/auth";
import CadastroPaciente from './pages/cadastros/CadastroPaciente';
import CadastroUsuarios from "./pages/cadastros/CadastroUsuario";
import CadastroMedico from './pages/cadastros/CadastroMedico';
import CadastroConsulta from './pages/cadastros/CadastroConsulta';

// Verifica se é Admin
const PermissaoAdmin = ({component : Component}) => (
    <Route
        render={props =>
            UsuarioAutenticado() && parseJwt().UsuarioTipo == "1" ? (
                <Component {...props}/>
            ) : (
                <Redirect to={{pathname: "/"}}/>
            )
        }
    />
)

// Verifica se é Medico
const PermissaoMedico = ({component : Component}) => (
    <Route
        render={props =>
            UsuarioAutenticado() && parseJwt().UsuarioTipo == "2" ? (
                <Component {...props}/>
            ) : (
                <Redirect to={{pathname: "/"}}/>
            )
        }
    />
)

// Verifica se é Paciente
const PermissaoPaciente = ({component : Component}) => (
    <Route
        render={props =>
            UsuarioAutenticado() && parseJwt().UsuarioTipo == "3" ? (
                <Component {...props}/>
            ) : (
                <Redirect to={{pathname: "/"}}/>
            )
        }
    />
)


const Routing = (
    <Router>
        <div>
            <Switch>
                <Route exact path="/" component={Login}/>
                <PermissaoPaciente path="/ConsultasPaciente" component={ConsultasPaciente} />
                <PermissaoMedico path="/ConsultasMedico" component={ConsultasMedico} />
                <PermissaoAdmin path="/CadastroPacientes" component={CadastroPaciente} />
                <PermissaoAdmin path="/CadastroUsuarios" component={CadastroUsuarios} />
                <PermissaoAdmin path="/CadastroMedico" component={CadastroMedico} />
                <PermissaoAdmin path="/CadastroConsulta" component={CadastroConsulta} />
                {/* <Route path="/DashBoard" component={DashBoard} />
                 */}
            </Switch>
        </div>
    </Router>
)
ReactDOM.render(Routing, document.getElementById('root'));

serviceWorker.unregister();
import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ImageBackground, Image, TouchableHighlight, StatusBar, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../../services/api';
import jwt from 'jwt-decode';
import LinearGradient from 'react-native-linear-gradient';

import stylesLogin from '../../assents/styles/login/style';
import Loader from './components/loader';

export default class Login extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);

        this.state = {
            // email: "mariana@outlook.com",
            // senha: "mariana132",
            // email: "ricardo.lemos@spmedicalgroup.com.br",
            // senha: "spricardo132",
            email: "",
            senha: "",
            mensagem: "",
            btnpressStatus: false,
            iptPressStatus1: false,
            iptPressStatus2: false,
            loading: false
        }
    }

    componentDidMount() {
        this._verificaAutenticacao();
    }

    _verificaAutenticacao = async () => {
        let token = await AsyncStorage.getItem("UsuarioToken");
        if (token != null) {
            let userLogado = jwt(token);

            if (userLogado.UsuarioTipo == 3) {
                this.props.navigation.navigate("PacienteMainDrawerNav");
            }
            else if (userLogado.UsuarioTipo == 2) {
                this.props.navigation.navigate("MedicoMainDrawerNav");
            }
            else {
                this.setState({ mensagem: "App não da suporte para usuários Administradores!!" });
            }
        }
    }

    _efetuarLogin = async () => {
        this.setState({ mensagem: "" });
        this.setState({ btnpressStatus: true })
        this.setState({ loading: true })

        try {
            const resposta = await api.post("/Login", {
                email: this.state.email,
                senha: this.state.senha
            })

            if (resposta.status === 200) {

                this.setState({ loading: false });

                const token = resposta.data.token;
                await AsyncStorage.setItem("UsuarioToken", token);

                let userLogado = jwt(token);

                if (userLogado.UsuarioTipo == 3) {
                    this.props.navigation.navigate("PacienteMainDrawerNav");
                }
                else if (userLogado.UsuarioTipo == 2) {
                    this.props.navigation.navigate("MedicoMainDrawerNav");
                }
                else {
                    this.setState({ mensagem: "App não da suporte para usuários Administradores!!" });
                }
            }
        }
        catch (error) {
            this.setState({ mensagem: "Email ou Senha Inválidos!!" })
            this.setState({ btnpressStatus: false })
            this.setState({ loading: false });
        }
    }

    // efeitos 
    // focus input
    _onIptFocus() {
        this.setState({ iptPressStatus1: true });
    }
    _onIptFocus2() {
        this.setState({ iptPressStatus2: true });
    }

    // focus lost input
    _onIptBlur() {
        this.setState({ iptPressStatus1: false });
    }
    _onIptBlur2() {
        this.setState({ iptPressStatus2: false });
    }

    render() {
        return (
            <ImageBackground
                source={require("../../assents/img/login/backgroundImg.jpg")}
                style={StyleSheet.absoluteFillObject}
            >
                <Loader
                    loading={this.state.loading}
                />
                <StatusBar hidden={true}></StatusBar>
                <View />
                <LinearGradient
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 0 }}
                    colors={["rgba(0, 255, 0, 0.6)", "rgba(0, 0, 255, 0.6)"]}
                    style={stylesLogin.overlay}
                ></LinearGradient>
                <View style={stylesLogin.main}>

                    <View style={stylesLogin}>
                        <Image
                            source={require("../../assents/img/components/icon-logo-circulo.png")}
                            style={stylesLogin.logo}
                        />
                    </View>

                    <View style={stylesLogin.form}>
                        <Text style={stylesLogin.titulo}>{"Login".toLocaleUpperCase()}</Text>


                        <TextInput
                            style={this.state.iptPressStatus1 ? stylesLogin.inputPress : stylesLogin.input}
                            placeholderTextColor="gray"
                            placeholder="Email"
                            onChangeText={email => this.setState({ email })}
                            onFocus={this._onIptFocus.bind(this)}
                            onBlur={this._onIptBlur.bind(this)}
                        />

                        <TextInput
                            style={this.state.iptPressStatus2 ? stylesLogin.inputPress : stylesLogin.input}
                            placeholder="Senha"
                            placeholderTextColor="gray"
                            secureTextEntry={true}
                            onChangeText={senha => this.setState({ senha })}
                            onFocus={this._onIptFocus2.bind(this)}
                            onBlur={this._onIptBlur2.bind(this)}
                        />

                        <TouchableOpacity
                            activeOpacity={0.7}
                            delayLongPress={1}
                            style={this.state.btnpressStatus ? stylesLogin.buttonPress : stylesLogin.button}
                            onPress={this._efetuarLogin}
                        >
                            <Text style={this.state.btnpressStatus ? stylesLogin.buttonTextPress : stylesLogin.buttonText}>Entrar</Text>
                        </TouchableOpacity>

                        <Text style={stylesLogin.mensagemErro}>{this.state.mensagem}</Text>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}


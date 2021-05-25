import { useState, createContext, useEffect } from 'react'
import firebase from '../fireBaseConnection'
import { toast } from 'react-toastify';

export const AuthContext = createContext({});

function AuthProvider({children}){
    const [user, setUser] = useState(null);

    useEffect(() => {
        function loadUser(){
            const storageUser = localStorage.getItem('user')
            if (storageUser)
                setUser(JSON.parse(storageUser))
        }
        loadUser()
    }, [])

    async function signUp(email, password, nome) {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async (value) => {
                let data = {
                    uid: value.user.uid,
                    nome: nome,
                    email: email,
                };
                await firebase.firestore().collection('users')
                    .doc(data.uid)
                    .set({
                        nome: nome,
                    })
                    .then(() => {
                        setUser(data);
                        localStorage.setItem('usuarioLogado', JSON.stringify(data));
                        toast.success('Usuário Cadastrado');
                    })
                    .catch((error) => {
                        console.log(error);
                        toast.error('Ops....ocorreu algum erro');
                    })
            })
            .catch((error) => {
                console.log(error);
                toast.error('Ops....ocorreu algum erro');
            })
    }

    async function signIn(email, password) {
        await firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async (value) => {
                let uid = value.user.uid;

                let usuario = await firebase.firestore().collection('users')
                    .doc(uid)
                    .get();
                let data = {
                    uid: uid,
                    nome: usuario.data().nome,
                    email: email,
                }
                setUser(data);
                setLocalUser(data);
                toast.success('Bem-vindo de volta!!');
            })
            .catch((error) => {
                console.log(error);
                toast.success('Ops ocorreu algum erro!');
            })
    }

    function setLocalUser(data){
        localStorage.setItem('user', JSON.stringify(data));
    }

    return (
        <AuthContext.Provider value={{
            signed: !!user,
            user,
            signIn,
            signUp,
            setUser,
            setLocalUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider;
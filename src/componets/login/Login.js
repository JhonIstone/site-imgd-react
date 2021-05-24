import './Login.css'
import Logo from '../../assets/logoBlack.png'
import { Link } from 'react-router-dom'
import BigLogo from '../../assets/logo2.png'
import {useEffect, useState, useContext} from 'react'
import {AuthContext} from '../../context/auth';

export default function Login(){
    const {signIn, loading}=useContext(AuthContext);

    useEffect(() => {
        document.querySelector('.linkLogin').classList.add('Active')
        document.querySelector('.linkRegister').classList.remove('Active')
    }, [])

    function handleSubmit(e){   
        e.preventDefault()
        const form = document.querySelector("#myForm")
        const senha = form.formSenha.value
        const email = form.formEmail.value
        signIn(email, senha)
    }

    return (
        <main className='mainLogin'>
            <section className='sectionLogin'>
                <img src={Logo} alt='Logo' />
                <div className='groupButtonsNav'>
                    <Link className='linkLogin' to='/Login'>LOGIN</Link>
                    <Link className='linkRegister' to='/Register'>CADASTRO</Link>
                </div>

                <form id='myForm' onSubmit={handleSubmit}>
                    <input name='formEmail' className='formEmail' type="email" placeholder="Email" />
                    <input name='formSenha' className='formSenha' type="password" placeholder="Senha:"/>

                    <div className='groupButonsLogin'>
                        <button className='btnRecuperar' type='button' disabled>ESQUECI MINHA SENHA</button>
                        <button className='btnEntrar' type='submit'>ENTRAR</button>
                    </div>
                </form>
            </section>
            <section className='sectionLogo'>
                <img src={BigLogo} alt='BigLogo'/>
            </section>
        </main>
    )
}
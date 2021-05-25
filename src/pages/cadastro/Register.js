import './Register.css'
import Logo from '../../assets/logoBlack.png'
import BigLogo from '../../assets/logo2.png'
import { Link } from 'react-router-dom'
import {useEffect, useContext} from 'react'
import {AuthContext} from '../../context/auth';

export default function Register(){

    const {signUp}=useContext(AuthContext);

    useEffect(() => {
        document.querySelector('.linkLogin').classList.remove('Active')
        document.querySelector('.linkRegister').classList.add('Active')
    }, [])

    function handleSubmit(e){   
        e.preventDefault()
        const form = document.querySelector("#myForm")
        const nome = form.formNome.value
        const senha = form.formSenha.value
        const email = form.formEmail.value
        signUp(email, senha, nome)
    }

    return (
        <main className='mainRegister'>
            <section className='sectionRegister'>
                <img src={Logo} alt='Logo' />
                <div className='groupButtonsNav'>
                    <Link className='linkLogin' to='/Login'>Login</Link>
                    <Link className='linkRegister' to='/Register'>Cadastro</Link>
                </div>

                <form id='myForm' onSubmit={handleSubmit}>
                    <input name='formNome' className='formNome' type="text" placeholder="Nome Usuario" />
                    <input name='formEmail' className='formEmail' type="email" placeholder="Email" />
                    <input name='formSenha' className='formSenha' type="password" placeholder="Senha:"/>

                    <div className='groupButonsLogin'>
                        <button className='btnEntrar' type='submit'>Cadastrar</button>
                    </div>
                </form>
            </section>
            <section className='sectionLogo'>
                <img src={BigLogo} alt='BigLogo'/>
            </section>
        </main>
    )
}
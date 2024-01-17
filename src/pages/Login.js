import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false) // Novo estado para rastrear o carregamento

  const navigate = useNavigate()
  const { signin } = useAuth()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      setLoading(true) // Ativar indicador de carregamento
      await signin({
        email: username,
        senha: password,
      })
      setUsername('')
      setPassword('')
      setError(null)
      navigate('/lista')
    } catch (exception) {
      setError('Credenciais incorretas. Tente novamente.')
      setTimeout(() => {
        setError(null)
      }, 5000)
    } finally {
      setLoading(false) // Desativar indicador de carregamento, independentemente do resultado
    }
  }

  return (
    <div className='d-flex flex-column min-vh-100'>
      <Header />

      <div className='container mt-3 animate__animated animate__fadeIn'>
        <h2 className='text-center'>Login</h2>
        {error && (
          <div className='container alert alert-danger mx-auto'>{error}</div>
        )}

        <form className='bg-light p-4 mx-auto my-3'>
          <div className='mb-3'>
            <label htmlFor='username' className='form-label'>
              E-mail:
            </label>
            <div className='input-group'>
              <span className='input-group-text'>
                <i className='bi bi-person'></i>
              </span>
              <input
                type='text'
                className='form-control'
                id='username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Senha:
            </label>
            <div className='input-group'>
              <span className='input-group-text'>
                <i className='bi bi-lock'></i>
              </span>
              <input
                type='password'
                className='form-control'
                id='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <button
            type='button'
            className='btn btn-primary'
            onClick={handleLogin}
            disabled={loading} // Desabilitar o botão durante o carregamento
          >
            {loading ? 'Carregando...' : 'Login'}
          </button>
          <p className='mt-3 text-center'>
            Não tem uma conta?{' '}
            <Link to='/registro'>Clique aqui para criar uma conta</Link>.
          </p>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default Login

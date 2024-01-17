import { useEffect, useState } from 'react'

import personService from '../services/phonebook'

// import Table from '../layout/Table'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Input from '../components/Input'
import Cards from '../components/Cards'

function Lista() {
  const [persons, setPersons] = useState([])
  const [nome, setNome] = useState('')
  const [numero, setNumero] = useState('')
  const [email, setEmail] = useState('')
  const [endereco, setEndereco] = useState('')
  const [dataNascimento, setDataNascimento] = useState('')
  const [foto, setFoto] = useState(null)
  const [fotoPreview, setFotoPreview] = useState(null) // Adicionando estado para a prévia da imagem
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData() // Carrega os dados iniciais
  }, [])

  const fetchData = () => {
    setLoading(true)
    personService
      .getAll()
      .then((response) => {
        setPersons(response.data)
        setLoading(false)
        setShowForm(false)
      })
      .catch((error) => {
        setLoading(false)
        if (error.response) {
          // O servidor respondeu com um status de erro
          console.error('Erro na requisição:', error.response)
        } else if (error.request) {
          // A requisição foi feita, mas não houve resposta do servidor
          console.error('Não foi possível se conectar ao servidor.')
          setError(
            'Não foi possível se conectar ao servidor. Verifique sua conexão de rede.'
          )
        } else {
          // Algo aconteceu na configuração da requisição que causou o erro
          console.error('Erro na configuração da requisição:', error.message)
        }
      })
  }

  const addPerson = async (event) => {
    event.preventDefault()
    const personObject = {
      nome,
      numero,
      email,
      endereco,
      dataNascimento,
      foto,
    }

    await personService.create(personObject)

    setNome('')
    setNumero('')
    setFoto(null) // Limpar a imagem após o envio

    // Após a criação, atualize a lista de persons chamando fetchData novamente
    fetchData()
  }

  const handleNomeChange = (event) => {
    // console.log(event.target.value);
    setNome(event.target.value)
  }

  const handleNumeroChange = (event) => {
    // console.log(event.target.value);
    setNumero(event.target.value)
  }

  const handleEmailChange = (event) => {
    // console.log(event.target.value);
    setEmail(event.target.value)
  }

  const handleEnderecoChange = (event) => {
    // console.log(event.target.value);
    setEndereco(event.target.value)
  }

  const handleDataNascimentoChange = (event) => {
    // console.log(event.target.value);
    setDataNascimento(event.target.value)
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFoto(file)

    // Exibindo uma prévia da imagem
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setFotoPreview(e.target.result)
      }
      reader.readAsDataURL(file)
    } else {
      setFotoPreview(null)
    }
  }

  const toggleForm = () => {
    setShowForm(!showForm)
  }

  const handleDelete = async (id) => {
    await personService.remove(id)
    // Após a exclusão, atualize a lista de persons chamando fetchData novamente
    fetchData()
  }

  return (
    <div className='d-flex flex-column min-vh-100'>
      <Header />
      <main className='flex-grow-1'>
        <div className='container animate__animated animate__fadeIn'>
          <h2 className='mt-2'>Listar e Cadastrar Pessoas</h2>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className='alert alert-warning' role='alert'>
              {error}
            </p>
          ) : (
            <>
              <button onClick={toggleForm} className='btn btn-success'>
                {showForm ? 'Voltar para a Lista' : 'Cadastrar Pessoa'}
              </button>

              {showForm ? (
                <>
                  <hr />
                  <form onSubmit={addPerson} className='bg-success-subtle p-2'>
                    <Input
                      textLabel='nome'
                      text='Nome'
                      inputType='text'
                      textPlaceholder='Digite o seu nome...'
                      handleChange={handleNomeChange}
                      isPhone={false}
                    />
                    <Input
                      textLabel='telefone'
                      text='Telefone'
                      inputType='text'
                      textPlaceholder='Digite o seu telefone...'
                      handleChange={handleNumeroChange}
                      isPhone={true}
                    />
                    <Input
                      textLabel='email'
                      text='Email'
                      inputType='email'
                      textPlaceholder='Digite o seu email...'
                      handleChange={handleEmailChange}
                      isPhone={false}
                    />
                    <Input
                      textLabel='endereco'
                      text='Endereço'
                      inputType='text'
                      textPlaceholder='Digite o seu endereço...'
                      handleChange={handleEnderecoChange}
                      isPhone={false}
                    />
                    <Input
                      textLabel='data_nascimento'
                      text='Data de nascimento'
                      inputType='date'
                      textPlaceholder=''
                      handleChange={handleDataNascimentoChange}
                      isPhone={false}
                    />
                    <div className='form-group'>
                      <label htmlFor='foto'>Foto: </label>
                      <input
                        type='file'
                        id='foto'
                        className='form-control-file m-2'
                        onChange={handleFileChange}
                      />
                      {fotoPreview && (
                        <img
                          src={fotoPreview}
                          alt='Preview'
                          style={{ maxWidth: '200px' }}
                        />
                      )}
                    </div>
                    <button className='btn btn-success'>Cadastrar</button>
                  </form>
                </>
              ) : (
                <div>
                  <hr />
                  <Cards persons={persons} handleDelete={handleDelete} />
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Lista

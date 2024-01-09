import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import personService from '../services/phonebook'
import Input from '../components/Input'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Editar() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [nome, setNome] = useState('')
  const [numero, setNumero] = useState('')
  const [email, setEmail] = useState('')
  const [endereco, setEndereco] = useState('')
  const [dataNascimento, setDataNascimento] = useState('')
  const [foto, setFoto] = useState(null)
  const [fotoPreview, setFotoPreview] = useState(null)
  const [fotoAntiga, setFotoAntiga] = useState(null) // Adicionando estado para a prévia da imagem

  useEffect(() => {
    personService
      .getOne(id)
      .then((response) => {
        setNome(response.data.nome)
        setNumero(response.data.numero)
        setEmail(response.data.email)
        setEndereco(response.data.endereco)

        // Formate a data no formato dd/mm/yyyy
        const formattedDate = new Date(
          response.data.data_nascimento
        ).toLocaleDateString('pt-BR')
        setDataNascimento(formattedDate)

        setFoto(response.data.foto)
        setFotoAntiga('http://localhost:3001/images/' + foto)
      })
      .catch((err) => navigate('/home'))
  }, [id, foto, navigate])

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

  const editPerson = async (event) => {
    event.preventDefault()

    // String no formato "dd/mm/aaaa"
    const dataString = dataNascimento

    // Divida a string em dia, mês e ano
    const partesData = dataString.split('/')
    const dia = partesData[0] // 06
    const mes = partesData[1] // 10 representa novembro (0-based)
    const ano = partesData[2] // 2023

    // Coloca a data no formato "aaaa/mm/dd"
    const data = ano + '/' + mes + '/' + dia

    const personObject = {
      nome,
      numero,
      email,
      endereco,
      dataNascimento: data,
      foto,
    }

    console.log(personObject)

    await personService.update(id, personObject)

    navigate('/lista')
  }

  const cancel = () => {
    navigate('/lista')
  }

  return (
    <div className='d-flex flex-column min-vh-100'>
      <Header />
      <main className='flex-grow-1 m-2'>
        <div className='container animate__animated animate__fadeIn'>
          <h2>Edição de Dados</h2>
          <hr />
          <form
            onSubmit={editPerson}
            className='bg-success-subtle p-2 form-control'
          >
            <Input
              textLabel='nome'
              text='Nome'
              inputType='text'
              textPlaceholder='Digite o seu nome...'
              handleChange={handleNomeChange}
              isPhone={false}
              defaultValue={nome}
            />
            <Input
              textLabel='telefone'
              text='Telefone'
              inputType='text'
              textPlaceholder='Digite o seu telefone...'
              handleChange={handleNumeroChange}
              isPhone={false}
              defaultValue={numero}
            />
            <Input
              textLabel='email'
              text='Email'
              inputType='email'
              textPlaceholder='Digite o seu email...'
              handleChange={handleEmailChange}
              isPhone={false}
              defaultValue={email}
            />
            <Input
              textLabel='endereco'
              text='Endereço'
              inputType='text'
              textPlaceholder='Digite o seu endereço...'
              handleChange={handleEnderecoChange}
              isPhone={false}
              defaultValue={endereco}
            />
            <Input
              textLabel='data_nascimento'
              text='Data de nascimento'
              inputType='text'
              textPlaceholder=''
              handleChange={handleDataNascimentoChange}
              isPhone={false}
              defaultValue={dataNascimento}
            />
            <div className='form-group'>
              <label htmlFor='foto'>Foto: </label>
              <input
                type='file'
                id='foto'
                className='form-control-file m-2'
                onChange={handleFileChange}
              />
              {fotoPreview ? (
                <img
                  src={fotoPreview}
                  alt='Preview'
                  style={{ maxWidth: '200px' }}
                />
              ) : fotoAntiga ? (
                <img
                  src={fotoAntiga}
                  alt='Preview'
                  style={{ maxWidth: '200px' }}
                />
              ) : null}
            </div>
            <button className='btn btn-success m-2'>Salvar</button>
            <button className='btn btn-danger m-2' onClick={() => cancel()}>
              Cancelar
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Editar

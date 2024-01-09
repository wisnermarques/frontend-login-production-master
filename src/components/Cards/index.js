import { useState } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import './index.css'

function Cards({ persons, handleDelete }) {
  const [taskIdToDelete, setTaskIdToDelete] = useState(null)

  const openConfirmation = (id) => {
    setTaskIdToDelete(id)
  }

  const confirmDelete = () => {
    if (taskIdToDelete !== null) {
      handleDelete(taskIdToDelete)
      setTaskIdToDelete(null) // Limpa o ID do item a ser deletado
    }
  }

  const cancelDelete = () => {
    setTaskIdToDelete(null) // Limpa o ID do item a ser deletado
  }

  const urlBase = '/images/'

  return (
    <div className='row mb-2'>
      {persons.length === 0 ? (
        <div>
          <p>Não existem dados a serem exibidos!</p>
        </div>
      ) : (
        persons.map((person) => (
          <div className='col-sm-4 my-2' key={person.id}>
            <div className='card m-2 d-flex flex-column h-100'>
              <img
                src={urlBase + person.foto}
                className='card-img-top'
                alt='foto'
                style={{ objectFit: 'cover', height: '200px' }} // Definindo um tamanho para a imagem
              />
              <div className='card-body'>
                <h5 className='card-title'>{person.nome}</h5>
                <p className='card-text address'>
                  <i className='bi bi-geo-alt'></i> {person.endereco}
                </p>
                <p className='card-text'>
                  <i className='bi bi-phone'></i>{' '}
                  <a href={`tel:${person.numero}`}>{person.numero}</a>
                </p>
                <p className='card-text'>
                  <i className='bi bi-envelope'></i>{' '}
                  <a href={`mailto:${person.email}`}>{person.email}</a>
                </p>
                <p className='card-text'>
                  <i className='bi bi-calendar'></i>{' '}
                  {format(new Date(person.data_nascimento), 'dd/MM/yyyy', {
                    locale: ptBR,
                  })}
                </p>
              </div>

              <div className='card-footer text-muted'>
                <Link to={`/edit/${person.id}`} className='btn btn-success'>
                  <i className='bi bi-pencil'></i> Editar
                </Link>
                <button
                  className='btn btn-danger mx-2'
                  onClick={() => openConfirmation(person.id)}
                >
                  <i className='bi bi-trash3'></i> Excluir
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      {/* Janela de alerta centralizada */}
      {taskIdToDelete !== null && (
        <div className='alert-overlay'>
          <div className='alert bg-light p-4 rounded'>
            <h4 className='mb-4'>Realmente deseja excluir?</h4>
            <div className='button-group'>
              <button className='btn btn-danger' onClick={confirmDelete}>
                Sim
              </button>
              <button className='btn btn-secondary' onClick={cancelDelete}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cards

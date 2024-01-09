import './index.css'

function Footer() {
  return (
    <footer className='mt-auto py-3 bg-dark'>
      <div className='container text-center'>
        <a
          href='https://pt-br.facebook.com/'
          target='_blank'
          rel='noreferrer'
          className='text-white me-3'
        >
          <i className='bi bi-facebook fs-3 icon'></i>
        </a>
        <a
          href='https://www.instagram.com'
          target='_blank'
          rel='noreferrer'
          className='text-white me-3'
        >
          <i className='bi bi-instagram fs-3 icon'></i>
        </a>
        <a
          href='https://www.webwhatsapp.com'
          target='_blank'
          rel='noreferrer'
          className='text-white me-3'
        >
          <i className='bi bi-whatsapp fs-3 icon'></i>
        </a>
        <p className='text-white mb-0'>
          Desenvolvido por &copy;<span className='highlight'>Wisner</span> -
          2023
        </p>
      </div>
    </footer>
  )
}

export default Footer

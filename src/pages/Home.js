import Footer from '../components/Footer'
import Header from '../components/Header'

function Home() {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Header />
      <main className='flex-grow-1'>
        <div className='container'>
          <h1>Página Home</h1>
          <p>Teste</p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Home

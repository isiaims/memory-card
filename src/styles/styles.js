const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  container: {
    fontFamily: 'system-ui, sans-serif',
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
    textAlign: 'center',
    backgroundColor: '#f7f9fa',
    borderRadius: '12px'
  },
  title: {
    color: '#2c3e50',
    textAlign: 'center'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    padding: '10px'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    border: '1px solid #eef2f3',
    cursor: 'pointer'
  },
  idBadge: {
    position: 'absolute',
    top: '10px',
    left: '10px',
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#7f8c8d',
    backgroundColor: '#f1f2f6',
    padding: '3px 8px',
    borderRadius: '20px'
  },
  image: {
    width: '130px',
    height: '130px',
    objectFit: 'contain',
    marginBottom: '15px'
  },
  pokemonName: {
    margin: '0',
    color: '#34495e',
    fontSize: '18px'
  },
  center: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#7f8c8d'
  }
}

export default styles
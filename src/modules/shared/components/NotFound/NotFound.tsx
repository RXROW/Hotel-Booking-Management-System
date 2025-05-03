import React from 'react'
import notfound from '../../../../assets/imges/404 error with a landscape-cuate.png'

const NotFound = () => {
  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <img
        src={notfound}
        alt="404"
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
      />
    </div>
  )
}

export default NotFound


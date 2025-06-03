import Image from 'next/image'
import React from 'react'

import './styles.css'

export default function HomePage() {
  return (
    <div className="home">
      <div className="content">
        <picture>
          <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg" />
          <Image
            alt="Payload Logo"
            height={65}
            src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
            width={65}
          />
        </picture>
        <h1>Bienvenido a tu nuevo proyecto.</h1>
        <div className="links">
          <a className="admin" href="/admin" rel="noopener noreferrer" target="_blank">
            Ir al panel de administración
          </a>
          <a
            className="docs"
            href="https://payloadcms.com/docs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Documentación
          </a>
        </div>
      </div>
      <div className="footer">
        <p>Puedes actualizar esta página editando</p>
        <a className="codeLink" href="#">
          <code>app/(frontend)/page.tsx</code>
        </a>
      </div>
    </div>
  )
}

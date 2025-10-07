import React from 'react'

const Footer = () => {
  return (
    <div>
      <div className="bg-gray-800 text-white py-8 px-6">
        <h3 className="text-xl sm:text-2xl font-semibold text-center mb-6">
          Follow us on:
        </h3>

        <div className="flex justify-center items-center gap-6">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/theinsightbit?igsh=bHZ5anV5MGMybDN3"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 hover:scale-110 transition-transform duration-300"
            aria-label="Instagram"
          >
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>

          {/* Threads */}

          <a
            href="https://www.threads.com/@theinsightbit"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 hover:scale-110 transition-transform duration-300"
            aria-label="Threads"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.373 0 0 5.372 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12c0-6.628-5.373-12-12-12zm4.796 15.52c-.833 1.152-2.208 1.816-3.864 1.816-2.297 0-4.285-1.451-4.977-3.614l1.769-.545c.459 1.345 1.694 2.28 3.208 2.28 1.044 0 1.967-.411 2.52-1.144.337-.445.497-.988.497-1.602 0-1.705-1.319-2.82-3.438-2.82h-.75v-1.623h.75c1.006 0 1.81-.244 2.36-.707.534-.447.81-1.081.81-1.863 0-.7-.282-1.283-.797-1.674-.503-.383-1.214-.576-2.111-.576-1.203 0-2.35.363-3.105.99l-1.048-1.404C9.41 3.78 10.682 3.28 12.17 3.28c1.343 0 2.475.333 3.315.983.867.666 1.33 1.63 1.33 2.779 0 1.364-.617 2.395-1.68 3.05 1.602.647 2.526 2.035 2.526 3.757 0 .978-.293 1.899-.865 2.67z" />
            </svg>
          </a>

          {/* Telegram */}

          <a
            href="https://t.me/Theinsightbit"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-tr from-blue-400 via-sky-500 to-indigo-600 hover:scale-110 transition-transform duration-300"
            aria-label="Telegram"
          >
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12 12-5.373 12-12S18.628 0 12 0zm5.52 8.197l-1.758 8.283c-.132.595-.48.739-.973.46l-2.695-1.987-1.301 1.25c-.144.144-.265.265-.54.265l.192-2.726 4.963-4.475c.216-.192-.048-.3-.336-.108l-6.13 3.864-2.64-.827c-.575-.18-.587-.575.12-.852l10.32-3.984c.48-.18.9.108.743.852z" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/theinsightbit?mibextid=ZbWKwL"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 hover:scale-110 transition-transform duration-300"
            aria-label="Facebook"
          >
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>

          {/* YouTube */}
          <a
            href="https://youtube.com/@theinsightbit"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-red-600 hover:scale-110 transition-transform duration-300"
            aria-label="YouTube"
          >
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>

          {/* X (Twitter) */}
          <a
            href="https://x.com/Theinsightbits"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-black hover:scale-110 transition-transform duration-300"
            aria-label="X"
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* WhatsApp */}
          <a
            href="https://whatsapp.com/channel/0029VbAh9qX8aKvJCAODaz2k"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500 hover:scale-110 transition-transform duration-300"
            aria-label="WhatsApp"
          >
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Footer

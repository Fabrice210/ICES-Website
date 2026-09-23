import { Link } from 'react-router-dom'

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label="ICES — accueil">
      <svg viewBox="0 0 118 36" role="img" aria-label="ICES">
        <path
          d="M22 6.5a12.5 12.5 0 1 0 0 23"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <circle cx="17.5" cy="18" r="5.5" fill="#1E8FD9" />
        <text
          x="31"
          y="27"
          fontFamily="Montserrat, sans-serif"
          fontWeight="800"
          fontSize="25"
          letterSpacing="-.5"
          fill="currentColor"
        >
          ICES
        </text>
      </svg>
    </Link>
  )
}

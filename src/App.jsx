import { useState, useCallback, useEffect, useMemo } from 'react'
import { UPPERCASE, LOWERCASE, NUMBERS, SYMBOLS, THEME_COLORS } from './constants'
import { Check, Files, Moon, Shield, Sun } from 'lucide-react'

const App = () => {
  // --- CORE STATE ---
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(16)
  const [useUppercase, setUseUppercase] = useState(true)
  const [useLowercase, setUseLowercase] = useState(true)
  const [useNumbers, setUseNumbers] = useState(true)
  const [useSymbols, setUseSymbols] = useState(true)
  const [isCopied, setIsCopied] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('gp-theme-v4')
    return saved !== null ? JSON.parse(saved) : true
  })

  const theme = isDarkMode ? THEME_COLORS.dark : THEME_COLORS.light

  // --- STRENGTH CALCULATION (LENGTH BASED) ---
  const strengthData = useMemo(() => {
    if (!password) return { label: 'Waiting...', color: 'bg-zinc-500', text: 'text-zinc-500' }

    const len = password.length
    if (len < 4) return { label: 'Very Weak', color: 'bg-red-600', text: 'text-white' }
    if (len < 7) return { label: 'Weak', color: 'bg-orange-300', text: 'text-black' }
    if (len < 9) return { label: 'Good', color: 'bg-green-200', text: 'text-black' }
    if (len < 11) return { label: 'Strong', color: 'bg-lime-300', text: 'text-black' }
    return { label: 'Very Strong', color: 'bg-emerald-600', text: 'text-white' }
  }, [password])

  // --- DISPLAY LOGIC ---
  const displayPassword = useMemo(() => {
    if (!password) return ''
    if (password.length > 18) {
      return password.substring(0, 18) + '...'
    }
    return password
  }, [password])

  // --- PERSISTENCE ---
  useEffect(() => {
    localStorage.setItem('gp-theme-v4', JSON.stringify(isDarkMode))
    document.body.className = isDarkMode ? 'theme-dark bg-[#09090b]' : 'theme-light bg-slate-50'
  }, [isDarkMode])

  // --- ACTIONS ---
  const generate = useCallback(() => {
    let pool = []
    if (useUppercase) pool = [...pool, ...UPPERCASE]
    if (useLowercase) pool = [...pool, ...LOWERCASE]
    if (useNumbers) pool = [...pool, ...NUMBERS]
    if (useSymbols) pool = [...pool, ...SYMBOLS]

    if (pool.length === 0) return

    let res = ''
    const array = new Uint32Array(length)
    window.crypto.getRandomValues(array)
    for (let i = 0; i < length; i++) {
      res += pool[array[i] % pool.length]
    }

    setPassword(res)
    setIsCopied(false)
  }, [length, useUppercase, useLowercase, useNumbers, useSymbols])

  // Auto-generate on parameter change or initial load
  useEffect(() => {
    generate()
  }, [generate])

  const copy = async (text) => {
    if (!text) return
    await navigator.clipboard.writeText(text)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  // Prevent deselecting all options
  const toggleOption = (current, setter) => {
    const activeCount = [useUppercase, useLowercase, useNumbers, useSymbols].filter(Boolean).length

    if (current && activeCount <= 1) return // Keep at least one active

    setter(!current)
  }

  return (
    <div
      className={`min-h-screen transition-all-custom flex flex-col items-center justify-center py-4 px-6 ${theme.text}`}>
      {/* Github Link div for top left corner */}
      <div className='corner'>
        <div className='inner inner-section'>
          <a href='https://github.com/Moazzam6659' className='github-corner' target='_blank'>
            <svg
              width={80}
              height={80}
              viewBox='0 0 250 250'
              className='svg-style'
              style={{
                fill: '#4f39f6',
                color: isDarkMode ? '#000000' : '#ffffff',
                position: 'absolute',
                top: 0,
                border: 0,
                left: 0,
                transform: 'scale(-1, 1)',
              }}>
              <path d='M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z' />
              <path
                d='M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2'
                fill='currentColor'
                style={{ transformOrigin: '130px 106px' }}
                className='left-corner'
              />
              <path
                d='M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z'
                fill='currentColor'
                className='octo-body'
              />
            </svg>
          </a>
        </div>
      </div>
      {/* Navbar / Switch-style Theme Toggle */}
      <nav className='relative md:fixed top-0 w-full max-w-6xl py-4 md:py-8 flex justify-end items-center pointer-events-none'>
        <div className='flex items-center gap-3 pointer-events-auto'>
          <Sun size={20} className={isDarkMode ? 'text-zinc-600' : 'text-amber-500'} />
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label='Toggle Theme'
            className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 relative ${
              isDarkMode ? 'bg-zinc-800' : 'bg-slate-300'
            }`}>
            <div
              className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 transform ${
                isDarkMode ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
          <Moon size={20} className={isDarkMode ? 'text-indigo-400' : 'text-slate-400'} />
        </div>
      </nav>
      <main className='w-full max-w-6xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 mt-6 md:mt-0'>
        {/* HEADING SECTION */}
        <header className='text-center space-y-3 px-4'>
          <h1 className='text-3xl md:text-5xl font-manrope font-black tracking-tight leading-tight'>
            Random Password Generator
          </h1>
          <p
            className={`text-sm md:text-base font-open-sans font-medium leading-relaxed mx-auto ${theme.subtext}`}>
            Instantly create strong and secure passwords to keep your account safe online.
          </p>
        </header>

        <div className='flex flex-col md:flex-row gap-8'>
          {/* HERO SECTION (Output) */}
          <section
            className={`w-full md:w-[65%] p-6 md:p-8 rounded-3xl md:rounded-4xl border shadow-md md:shadow-lg ${theme.surface} ${theme.border} text-center relative overflow-hidden`}>
            <div className='mb-6 md:mb-8'>
              <span
                className={`text-[10px] md:text-xs font-manrope font-black tracking-[0.2em] uppercase py-1.5 px-3 md:px-4 rounded-full duration-500 ${strengthData.text} ${strengthData.color}`}>
                {strengthData.label}
              </span>
            </div>

            <div className='relative'>
              <h2
                className={`text-2xl md:text-5xl font-manrope tracking-wide break-all transition-all duration-300 h-auto min-h-[1.5em] flex items-center justify-center ${
                  password ? theme.text : 'opacity-10'
                }`}>
                {displayPassword || '••••••••••••••••'}
              </h2>

              <div className='mt-10 flex items-center justify-center gap-3'>
                <button
                  onClick={() => copy(password)}
                  disabled={!password}
                  className={`p-3 md:p-4 rounded-xl md:rounded-2xl border active:scale-90 cursor-pointer ${
                    theme.secondary
                  } ${theme.border} ${!password && 'opacity-20'} ${
                    isCopied ? 'text-emerald-500 border-emerald-500/50' : ''
                  }`}
                  title='Copy full password to clipboard'>
                  {isCopied ? <Check /> : <Files />}
                </button>

                <button
                  onClick={generate}
                  className={`flex-1 py-3 md:py-4 px-4 md:px-8 rounded-xl md:rounded-2xl flex items-center justify-center gap-3 font-manrope font-bold text-base md:text-lg shadow-xl transition-all active:scale-[0.98] cursor-pointer ${theme.primary} text-white`}>
                  Refresh Password
                </button>
              </div>
            </div>
          </section>

          {/* CONTROLS SECTION */}
          <section
            className={`w-full md:w-[35%] p-6 md:p-8 rounded-3xl md:rounded-4xl border shadow-md md:shadow-lg ${theme.surface} ${theme.border}`}>
            <div className='space-y-10'>
              {/* Length Control */}
              <div className='space-y-6'>
                <div className='flex justify-between items-center'>
                  <label className='text-xs text-zinc-500 font-manrope font-bold uppercase tracking-widest'>
                    Password Length
                  </label>
                  <span className='text-2xl font-open-sans font-bold'>{length}</span>
                </div>
                <input
                  type='range'
                  min='1'
                  max='50'
                  value={length}
                  onChange={(e) => setLength(parseInt(e.target.value))}
                  className='w-full cursor-grab active:cursor-grabbing'
                />
              </div>

              {/* Detailed Toggles */}
              <div className='grid grid-cols-2 gap-3'>
                <Toggle
                  label='ABC'
                  active={useUppercase}
                  onClick={() => toggleOption(useUppercase, setUseUppercase)}
                  theme={theme}
                />
                <Toggle
                  label='abc'
                  active={useLowercase}
                  onClick={() => toggleOption(useLowercase, setUseLowercase)}
                  theme={theme}
                />
                <Toggle
                  label='123'
                  active={useNumbers}
                  onClick={() => toggleOption(useNumbers, setUseNumbers)}
                  theme={theme}
                />
                <Toggle
                  label='#$&'
                  active={useSymbols}
                  onClick={() => toggleOption(useSymbols, setUseSymbols)}
                  theme={theme}
                />
              </div>
            </div>
          </section>
        </div>
      </main>
      <footer className='mt-10 text-gray-400 text-[11px] md:text-xs font-open-sans font-bold tracking-[0.2em] uppercase text-center max-w-xs leading-loose'>
        Made with <span className='text-red-500'>❤</span> by Moazzam
      </footer>
    </div>
  )
}

// --- MODERN ATOMIC COMPONENTS ---

const Toggle = ({ label, active, onClick, theme }) => (
  <button
    onClick={onClick}
    className={`p-3 md:p-4 rounded-xl md:rounded-2xl border text-left flex justify-between items-center group active:scale-[0.98] cursor-pointer ${
      active ? `border-indigo-500 ${theme.input}` : `${theme.border} ${theme.surface}`
    }`}>
    <div>
      <p className='text-sm font-manrope font-black tracking-tight'>{label}</p>
    </div>
    <div
      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
        active ? 'bg-indigo-500 border-indigo-500' : 'border-zinc-300 group-hover:border-zinc-400'
      }`}>
      {active && <Check className='text-white' />}
    </div>
  </button>
)

export default App

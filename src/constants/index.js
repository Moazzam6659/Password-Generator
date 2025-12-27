const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'.split('')
const NUMBERS = '0123456789'.split('')
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?'.split('')

const THEME_COLORS = {
  dark: {
    bg: 'bg-[#09090b]', // Zinc 950
    surface: 'bg-[#18181b]', // Zinc 900
    border: 'border-zinc-800',
    text: 'text-zinc-100',
    subtext: 'text-zinc-400',
    accent: 'bg-indigo-600',
    accentText: 'text-indigo-400',
    primary: 'bg-indigo-600 hover:bg-indigo-500',
    secondary: 'bg-zinc-800 hover:bg-zinc-700',
    input: 'bg-zinc-900',
  },
  light: {
    bg: 'bg-slate-50',
    surface: 'bg-white',
    border: 'border-slate-200',
    text: 'text-slate-900',
    subtext: 'text-slate-500',
    accent: 'bg-indigo-600',
    accentText: 'text-indigo-600',
    primary: 'bg-slate-900 hover:bg-slate-800',
    secondary: 'bg-slate-100 hover:bg-slate-200',
    input: 'bg-white',
  },
}

export { UPPERCASE, LOWERCASE, NUMBERS, SYMBOLS, THEME_COLORS }

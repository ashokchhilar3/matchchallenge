const STORAGE_KEY = 'math-challenge-session'

const canUseSessionStorage = () =>
  typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined'

export const loadSessionState = () => {
  if (!canUseSessionStorage()) {
    return null
  }

  const rawValue = window.sessionStorage.getItem(STORAGE_KEY)

  if (!rawValue) {
    return null
  }

  try {
    return JSON.parse(rawValue)
  } catch {
    return null
  }
}

export const saveSessionState = (value) => {
  if (!canUseSessionStorage()) {
    return
  }

  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value))
}

export const clearSessionState = () => {
  if (!canUseSessionStorage()) {
    return
  }

  window.sessionStorage.removeItem(STORAGE_KEY)
}

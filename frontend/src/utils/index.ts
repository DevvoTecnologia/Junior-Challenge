export function getTokenLocalStorage() {
  if (typeof window !== 'undefined') {
    const json = localStorage.getItem('token')

    if (!json) {
      return null
    }

    const token = JSON.parse(json)

    return token
  }
}

export function setTokenLocalStorage(token: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', JSON.stringify(token))
  }
}

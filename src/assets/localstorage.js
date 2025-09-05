//init local storage
const initLocalStorage = () => {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([]))
  }
  if (!localStorage.getItem('parcours')) {
    localStorage.setItem('parcours', JSON.stringify([]))
  }
}

const getLocalStorage = (key) => {
  return {
    users: JSON.parse(localStorage.getItem(`${key}`))
  }
}

const setLocalStorage = (data, key) => {//key = users ou parcours
  console.log(data, key)
  localStorage.setItem(data, `${key}`)
  getLocalStorage(key)
}

const removeLocalStorage = (key) => {
  localStorage.removeItem(key)
}

export { initLocalStorage, getLocalStorage, setLocalStorage, removeLocalStorage }
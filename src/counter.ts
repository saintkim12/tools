export function setupCounter(element: HTMLButtonElement) {
  let counter = 0
  const setCounter = (count: number) => {
    counter = count
    element.innerHTML = `count is ${counter}`
  }
  const clickEvent = () => setCounter(counter + 1)
  element.addEventListener('click', clickEvent)
  setCounter(0)
  return () => {
    element.removeEventListener('click', clickEvent)
  }
}

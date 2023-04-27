import { useStoreon } from 'storeon/react'
import { default as Login } from './Login'
import { default as Signin } from './Signin'
import { default as Home } from './Home'
import { routerKey } from '@storeon/router'

const Page = () =>{
  const { [routerKey]: route } = useStoreon(routerKey)

  let Component = null
  switch (route.match.page) {
    case 'home':
      Component = <Home />
      break
    case 'login':
      Component = <Login />
      break
    case 'signin':
      Component = <Signin />
      break
    default:
      Component = <h1>404 Error</h1>
  }

  return (
    <main>
      {Component}
    </main>
  )
}

export default Page

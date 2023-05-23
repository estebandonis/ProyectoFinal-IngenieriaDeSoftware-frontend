import { useStoreon } from 'storeon/react'
import { default as Login } from './LogIn'
import { default as Signin } from './SignIn'
import { default as Home } from './Home'
import { default as Info_Hospitales } from './Info_Hospitales'
import { default as Info_User } from './Info_User'
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
    case 'info_hospitales':
      Component = <Info_Hospitales />
      break
    case 'info_user':
      Component = <Info_User />
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

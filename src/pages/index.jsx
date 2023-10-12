import { useStoreon } from 'storeon/react'
import { default as Login } from './LogIn'
import { default as Signin } from './SignIn'
import { default as Add_Hospital } from './Add_Hospital'
import { default as Update_Hospital } from './Update_Hospital'
import { default as Home } from './Home'
import { default as Admin} from './Home_Admin'
import { default as Info_Hospitales } from './Info_Hospitales'
import { default as Info_User } from './Info_User'
import { default as Examenes } from './Examenes'
import { default as Info_Examen } from './Info_Examen'
import { default as Manager_Menu } from './Manager_Menu'
import { routerKey } from '@storeon/router'

const Page = () =>{
  const { [routerKey]: route } = useStoreon(routerKey)

  let Component = null
  switch (route.match.page) {
    case 'home':
      Component = <Home />
      break
    case 'admin':
      Component = <Admin />
      break
    case 'login':
      Component = <Login />
      break
    case 'signin':
      Component = <Signin />
      break
    case 'addhospital':
      Component = <Add_Hospital />
      break
    case 'managereviews':
      Component = <Manager_Menu />
      break
    case 'updatehospital':
      Component = <Update_Hospital />
      break
    case 'info_hospitales':
      Component = <Info_Hospitales />
      break
    case 'info_user':
      Component = <Info_User />
      break
    case 'examenes':
      Component = <Examenes />
      break
    case 'info_examen':
      Component = <Info_Examen />
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

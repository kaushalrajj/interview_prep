
import './App.css'
import { SignedOut,SignedIn ,SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react'

function App() {

  return (
    <>
      <h1>welcome to the  app</h1>
      <SignedOut>
      <SignInButton  mode="modal">
        <button >lOG In</button>
        </SignInButton>
    </SignedOut>

    <SignedIn>
      <SignOutButton/>
    </SignedIn>

    <UserButton/>
 </>
  ) 
}

export default App

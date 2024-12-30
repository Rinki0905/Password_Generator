import { useState ,useCallback,useEffect,useRef} from 'react'

import './App.css'

function App() {
const [length,setlength]= useState(9)
const [numberAllowed,setnumberAllowed]=useState(false);
const [charAllowed, setcharAllowed]=useState(false);
const [password, setPassword]=useState("");
//use refhook
const passwordRef=useRef(null)

const passwordGenerator = useCallback(() => {
let pass=""
let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
if(numberAllowed) str+="0123456789"
if(charAllowed) str+="!@#$%^&*(){}\,~`" 

for(let i=1;i<=length;i++){
  let char=Math.floor(Math.random()*str.length +1)
  pass+=str.charAt(char)// setpassword
}
setPassword(pass) //read password

},[length,numberAllowed,charAllowed,setPassword])

const copyPasswordToClipboard=useCallback(()=>{
  passwordRef.current?.select()
 // passwordRef.current?.setselectionRange(0,5);
  window.navigator.clipboard.writeText(password)
},[password])




useEffect(()=>{
  //run passwordGenerator
  passwordGenerator()
},[length,numberAllowed,charAllowed,passwordGenerator])


  return (
  <>
  <div className="flex items-center justify-center min-h-screen rounded-lg bg-gray-600">
    <div className="bg-green-100 rounded-lg shadow-lg p-6 max-w-md w-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Password Generator
      </h1>

      {/* Password Display Section */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={password}
          readOnly
          ref={passwordRef}
          className="flex-grow p-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Your Password"
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        onClick={copyPasswordToClipboard}
        >
          Copy
        </button>
      </div>

      {/* Settings Section */}
      <div className="space-y-4">
        <div className="flex items-center">
          <label htmlFor="length" className="text-gray-700 mr-4">
            Password Length: 
          </label>
          <input
            id="length"
            type="number"
            min={1}
            max={50}
            value={length}
            onChange={(e) => setlength(e.target.value)}
            className="w-16 p-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex items-center">
          <input
            id="numberAllowed"
            type="checkbox"
            default checked={numberAllowed}
            onChange={() => setnumberAllowed(!numberAllowed)}
            className="mr-2"
          />
          <label htmlFor="numberAllowed" className="text-gray-700">
            Include Numbers
          </label>
        </div>
        <div className="flex items-center">
          <input
            id="charAllowed"
            type="checkbox"
            checked={charAllowed}
            onChange={() => setcharAllowed(!charAllowed)}
            className="mr-2"
          />
          <label htmlFor="charAllowed" className="text-gray-700">
            Include Special Characters
          </label>
        </div>
      </div>

      {/* Generate Button */}
      <button
        className="w-full mt-6 py-2 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition"
        onClick={passwordGenerator}
      >
        Generate Password
      </button>
    </div>
  </div>

    </>
  )
}

export default App

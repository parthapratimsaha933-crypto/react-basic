import { useEffect, useRef, useState } from "react"

function PasswordGenerator() {

    const letterString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    const numberString = "0123456789"
    const symbolString = "!@#$%^&*()"

    const [password, setPassword] = useState("")
    const [charLength, setCharLength] = useState(12)
    const [includeNumber, setIncludeNumber] = useState(true)
    const [includeSymbol, setIncludeSymbol] = useState(false)
    const inputRef = useRef(null)


    useEffect(() => {
      let generatedPassword = ""
      let passwordString = letterString
      if(includeNumber){
        passwordString += numberString
      }
       if(includeSymbol){
        passwordString += symbolString
      }
      for(let i=0; i<charLength; i++){
        const charIndex = Math.floor(Math.random() * (passwordString.length + 1))
        generatedPassword += passwordString.charAt(charIndex)
      }
      setPassword(generatedPassword)
    }, [charLength, includeNumber, includeSymbol])

    const copyToClipBoard = () => {
        navigator.clipboard.writeText(password)
        inputRef.current.select()
    }


    return (
        <>
            <div className="bg-gray-100 flex items-center justify-center min-h-screen font-sans text-slate-200">
                <div className="w-full max-w-md bg-gray-700 p-8 rounded-2xl shadow-2xl border border-slate-700">
                    <h1 className="text-2xl font-bold text-center mb-8 text-white tracking-tight">Password Generator</h1>

                    <div className="relative mb-6">
                        <input 
                            ref={inputRef}
                            type="text" 
                            id="password-display" 
                            readOnly 
                            placeholder="P4ssw0rd!"
                            value={password}
                            className="w-full bg-slate-900 border border-slate-600 text-cyan-400 text-xl font-mono py-4 px-4 rounded-lg focus:outline-none"
                        />
                        <button 
                            onClick={copyToClipBoard}
                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-slate-700 hover:bg-slate-600 text-xs uppercase font-bold py-2 px-3 rounded transition-colors"
                        >
                            Copy
                        </button>
                    </div>

                    <div className="mb-6">
                        <div className="flex justify-between mb-2">
                            <label className="text-sm font-medium text-slate-400">Character Length</label>
                            <span id="length-val" className="text-cyan-400 font-bold text-xl">{charLength}</span>
                        </div>
                        <input 
                            type="range" id="length-slider" min="6" max="32" value={charLength} onChange={((event) => setCharLength(event.target.value))}
                            className="w-full h-2 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                        />
                    </div>

                    <div className="space-y-4 mb-8">
                        <label className="flex items-center space-x-3 cursor-pointer group">
                            <input type="checkbox" id="numbers" checked={includeNumber} onChange={(event) => setIncludeNumber(event.target.checked)} className="w-5 h-5 rounded border-slate-600 bg-slate-900 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-800"/>
                            <span className="text-slate-300 group-hover:text-white transition-colors">Include Numbers</span>
                        </label>
                        <label className="flex items-center space-x-3 cursor-pointer group">
                            <input type="checkbox" id="symbols" checked={includeSymbol} onChange={(event) => setIncludeSymbol(event.target.checked)} className="w-5 h-5 rounded border-slate-600 bg-slate-900 text-cyan-500 focus:ring-cyan-500 focus:ring-offset-slate-800"/>
                            <span className="text-slate-300 group-hover:text-white transition-colors">Include Symbols</span>
                        </label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PasswordGenerator
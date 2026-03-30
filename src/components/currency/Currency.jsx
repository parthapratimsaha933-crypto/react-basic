import { useState, useEffect } from "react"

function Currency() {
  const [amount, setAmount] = useState(0)
  const [convertedAmount, setConvertedAmount] = useState(0)
  const [currencyFrom, setCurrencyFrom] = useState("usd")
  const [currencyTo, setCurrencyTo] = useState("inr")

  const [currencyInfo, setCurrencyInfo] = useState({})
  useEffect(() => {
        fetch(`https://latest.currency-api.pages.dev/v1/currencies/${currencyFrom}.json`)
    .then((response) => {
      return response.json()
    })
    .then((jsonResponse) => {
      console.log(`Response: ${jsonResponse[currencyFrom]}`)
      setConvertedAmount((amount * jsonResponse[currencyFrom][currencyTo]).toFixed(2))
      return setCurrencyInfo(jsonResponse[currencyFrom])
    })
    },[currencyFrom])

  const options = Object.keys(currencyInfo)

  const onAmountChange = (event) => {
    setAmount(event.target.value)
    setConvertedAmount((event.target.value * currencyInfo[currencyTo]).toFixed(2))
  }

  const onCurrencyFromChange = (event) => {
    setCurrencyFrom(event.target.value)
  }

  const onCurrencyToChange = (event) => {
    setCurrencyTo(event.target.value)
    setConvertedAmount((amount * currencyInfo[event.target.value]).toFixed(2))
  }

  const swap = ()=> {
    setCurrencyFrom(currencyTo)
    setCurrencyTo(currencyFrom)
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Currency Converter</h2>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Amount</label>
            <input
              type="number"
               value={amount}
               onChange={onAmountChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-lg font-semibold"
              placeholder="0.00"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 items-center sm:grid-cols-[1fr_auto_1fr]">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">From</label>
              <select 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={currencyFrom}
                onChange={onCurrencyFromChange}
              >
                {
                  options.map((option) => (
                    <option key={option} value={option}>
                        {option.toUpperCase()}
                    </option>
                  ))
                }
              </select>
            </div>

            <div className="flex justify-center pt-5">
              <button onClick={swap} className="p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors">
                <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 14 3-3m-3 3 3 3m-3-3h16v-3m2-7-3 3m3-3-3-3m3 3H3v3"/>
                </svg>
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">To</label>
              <select 
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={currencyTo}
                onChange={onCurrencyToChange}
              >
                {
                  options.map((option) => (
                    <option key={option} value={option}>
                       {option.toUpperCase()}
                    </option>
                  ))
                }
              </select>
            </div>
          </div>

          <div className="mt-8 p-6 bg-blue-600 rounded-xl text-white text-center shadow-lg shadow-blue-200">
            <p className="text-blue-100 text-sm mb-1 uppercase tracking-wider font-semibold">
              Converted Amount
            </p>
            <h3 className="text-3xl font-bold">
              {convertedAmount}
            </h3>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Currency
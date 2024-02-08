import axios from 'axios'
import React, { useEffect, useState } from 'react'


const Converter = () => {
  const [baseCurrency, setBaseCurrency] = useState('USD')
  const [targetCurrency, setTargetCurrency] = useState('EUR')
  const [exchangeRate, setExchangeRate] = useState(0)
  const [baseAmount, setBaseAmount] = useState(0)
  const [targetAmount, setTargetAmount] = useState(0)
  const [rates, setRates] = useState({})


  useEffect(() => {
    axios.get('https://api.exchangerate-api.com/v4/latest/USD')

      .then(response => response.json())
      .then(data => {
        if (data.rates && data.rates[targetCurrency]) {
          const rate = data.rates[targetCurrency]
          setExchangeRate(rate)
          setTargetAmount((baseAmount * rate).toFixed(2))
        } else {
          console.error('Exchange rate not found for target currency:', targetCurrency)
        }
      })

      //   const rate = data.rates[targetCurrency]
      //   setExchangeRate(rate)
      //   setTargetAmount((baseAmount * rate).toFixed(2))
      // })
      .catch(error => {
        console.error('Error fetching exchange rate:', error)
      })
  }, [baseCurrency, targetCurrency, baseAmount])

  const handleBaseCurrencyChange = (event) => {
    setBaseCurrency(event.target.value)
  }

  const handleTargetCurrencyChange = (event) => {
    setTargetCurrency(event.target.value)
  }

  const handleBaseAmountChange = (event) => {
    setBaseAmount(event.target.value)
  }

  const handleTargetAmountChange = (event) => {
    setTargetAmount(event.target.value)
  }

  const swapCurrencies = () => {
    const tempCurrency = baseCurrency
    setBaseCurrency(targetCurrency)
    setTargetCurrency(tempCurrency)
  }

  return (
    <div>
      <label>Вы переводите из: </label>
      <select value={baseCurrency} onChange={handleBaseCurrencyChange}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="RUB">RUB</option>
        {/* Add more currency options here */}
      </select>

      <label> в </label>
      <select value={targetCurrency} onChange={handleTargetCurrencyChange}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
        <option value="RUB">RUB</option>
        {/* Add more currency options here */}
      </select>

      <div>
        <label> Сумма перевода: </label>
        <input type="contenteditable" value={baseAmount} onChange={handleBaseAmountChange} />
      </div>

      <div>
        <label> Результат:</label>
        <input type="contenteditable" value={targetAmount} onChange={handleTargetAmountChange} />
      </div>

      <button onClick={swapCurrencies}>Поменять туда сюда </button>
    </div>
  )
}

export default Converter

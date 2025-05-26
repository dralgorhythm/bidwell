'use client'

import { useState } from 'react'

interface ComparisonResult {
  number1: number
  number2: number
  result: 'greater' | 'less' | 'equal'
  difference?: number
}

export default function ComparisonForm() {
  const [number1, setNumber1] = useState<string>('')
  const [number2, setNumber2] = useState<string>('')
  const [result, setResult] = useState<ComparisonResult | null>(null)
  const [error, setError] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Validate inputs
    const num1 = parseFloat(number1)
    const num2 = parseFloat(number2)

    if (isNaN(num1) || isNaN(num2)) {
      setError('Please enter valid numbers for both fields.')
      setResult(null)
      return
    }

    // Compare numbers
    let comparisonResult: 'greater' | 'less' | 'equal'
    if (num1 > num2) {
      comparisonResult = 'greater'
    } else if (num1 < num2) {
      comparisonResult = 'less'
    } else {
      comparisonResult = 'equal'
    }

    setResult({
      number1: num1,
      number2: num2,
      result: comparisonResult,
      difference: comparisonResult !== 'equal' ? Math.abs(num1 - num2) : 0,
    })
  }

  const handleReset = () => {
    setNumber1('')
    setNumber2('')
    setResult(null)
    setError('')
  }

  const getResultMessage = (result: ComparisonResult): string => {
    const { number1, number2, result: comparison, difference } = result
    
    switch (comparison) {
      case 'greater':
        return `${number1} is greater than ${number2} by ${difference}`
      case 'less':
        return `${number1} is less than ${number2} by ${difference}`
      case 'equal':
        return `${number1} and ${number2} are equal`
      default:
        return ''
    }
  }

  const getResultColor = (comparison: 'greater' | 'less' | 'equal'): string => {
    switch (comparison) {
      case 'greater':
        return 'text-green-600 dark:text-green-400'
      case 'less':
        return 'text-red-600 dark:text-red-400'
      case 'equal':
        return 'text-blue-600 dark:text-blue-400'
      default:
        return ''
    }
  }

  return (
    <div className="max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label 
            htmlFor="number1" 
            className="block text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-300"
          >
            First Number
          </label>
          <input
            type="number"
            id="number1"
            value={number1}
            onChange={(e) => setNumber1(e.target.value)}
            step="any"
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-400 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
            placeholder="Enter first number"
            required
          />
        </div>

        <div>
          <label 
            htmlFor="number2" 
            className="block text-sm font-medium mb-2 text-neutral-700 dark:text-neutral-300"
          >
            Second Number
          </label>
          <input
            type="number"
            id="number2"
            value={number2}
            onChange={(e) => setNumber2(e.target.value)}
            step="any"
            className="w-full px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-400 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
            placeholder="Enter second number"
            required
          />
        </div>

        <div className="flex space-x-2">
          <button
            type="submit"
            className="px-4 py-2 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 rounded-md hover:bg-neutral-800 dark:hover:bg-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-400 transition-colors"
          >
            Compare
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 rounded-md hover:bg-neutral-50 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:focus:ring-neutral-400 transition-colors"
          >
            Reset
          </button>
        </div>
      </form>

      {error && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-6 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-md border border-neutral-200 dark:border-neutral-700">
          <h3 className="font-medium text-lg mb-2 text-neutral-900 dark:text-neutral-100">
            Comparison Result
          </h3>
          <p className={`text-lg font-semibold ${getResultColor(result.result)}`}>
            {getResultMessage(result)}
          </p>
          {result.result !== 'equal' && (
            <div className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              <p>Absolute difference: {result.difference}</p>
              <p>
                Percentage difference: {
                  ((result.difference! / Math.min(Math.abs(result.number1), Math.abs(result.number2))) * 100).toFixed(2)
                }%
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

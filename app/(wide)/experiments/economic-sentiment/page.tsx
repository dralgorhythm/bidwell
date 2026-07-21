import { experimentMetadata } from '../../../(main)/experiments/config'

export const metadata = experimentMetadata('economic-sentiment')

export default function EconomicSentimentPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-4xl font-bold mb-4'>Economic Sentiment</h1>
      <p className='text-lg text-gray-600 mb-6'>The Meme Market</p>
      <div className='prose max-w-none'>
        <p>
          Economic Sentiment visualizes financial ideas as viruses. Adapting the SIR
          (Susceptible-Infected-Recovered) model from epidemiology, it tracks the spread of
          narratives (tickers, memes, FUD) across social platforms, quantifying narrative velocity.
        </p>
        <p className='text-sm text-gray-500 mt-8'>
          This experiment is currently under development.
        </p>
      </div>
    </div>
  )
}

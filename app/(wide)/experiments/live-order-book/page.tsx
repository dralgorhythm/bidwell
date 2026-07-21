import { experimentMetadata } from '../../../(main)/experiments/config'

export const metadata = experimentMetadata('live-order-book')

export default function LiveOrderBookPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-4xl font-bold mb-4'>Live Order Book</h1>
      <p className='text-lg text-gray-600 mb-6'>The Market Depth Crumble</p>
      <div className='prose max-w-none'>
        <p>
          This concept renders the limit order book as a physical structure - two opposing walls of
          "Buy" and "Sell" volume. As trades occur, they are visualized as projectiles smashing into
          these walls, physically destroying the blocks, helping traders intuitively feel the "sell
          pressure" or "support."
        </p>
        <p className='text-sm text-gray-500 mt-8'>
          This experiment is currently under development.
        </p>
      </div>
    </div>
  )
}

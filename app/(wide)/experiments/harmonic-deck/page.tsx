export default function HarmonicDeckPage() {
  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-4xl font-bold mb-4'>Harmonic Deck</h1>
      <p className='text-lg text-gray-600 mb-6'>The Gamified Composer</p>
      <div className='prose max-w-none'>
        <p>
          Harmonic Deck gamifies music composition using the mechanics of a deck-building card game.
          Users "play" cards representing chords, melodies, or effects onto a timeline "board,"
          turning composition into a strategic game of combinatorics.
        </p>
        <p className='text-sm text-gray-500 mt-8'>
          This experiment is currently under development.
        </p>
      </div>
    </div>
  )
}

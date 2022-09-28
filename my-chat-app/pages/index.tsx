import type { NextPage } from 'next'
import Link from 'next/link'

const Home: NextPage = () => {
  return (
    <div>
      <h1><Link href="/">Home</Link></h1>
      <Link href="/conversations">Go to conversations</Link>
    </div>
  )
}

export default Home

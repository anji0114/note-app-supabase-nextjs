import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  revalidated: boolean
}
type Msg = {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | Msg>
) {
  console.log('Revalidating notes page ...')
  if (req.query.select !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: 'Your secret ins invalid!' })
  }
  let revalidated = false
  try {
    await res.revalidate('/notes')
    revalidated = true
  } catch (err) {
    console.log(err)
  }
  res.json({
    revalidated,
  })
}

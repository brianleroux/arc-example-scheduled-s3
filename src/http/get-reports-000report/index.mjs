import arc from '@architect/functions'
import data from '@architect/shared/data.mjs'

export let handler = arc.http(auth, report)

async function auth (req) {
  let loggedIn = !!req.session.loggedIn
  if (!loggedIn) {
    return { location: '/' }
  }
}

async function report (req) {
  let html = await data.read({
    path: `reports/${ req.params.report }`
  })
  console.log('hello???', html)
  return { html }
}

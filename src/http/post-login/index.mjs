import arc from '@architect/functions'

export let handler = arc.http(login)

async function login (req) {
  let loggedIn = req.body.pswd === process.env.PSWD
  return {
    session: { loggedIn },
    location: '/'
  }
}

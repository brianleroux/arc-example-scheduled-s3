import arc from '@architect/functions'
import data from '@architect/shared/data.mjs'

export let handler = arc.http(login)

async function login (req) {
  let loggedIn = !!req.session.loggedIn
  return {
    html: loggedIn? await authorized() : await unauthorized()
  }
}

async function unauthorized () {
  return `<form action=/login method=post>
    <input 
      type=password 
      name=pswd 
      placeholder='enter password'>
    <button>login</button>
  </form>`
}

async function authorized () {
  let reports = await data.list({ prefix: 'reports' })
  let links = reports.map(r => `<li><a href=${r}>${r}</a></ul>`).join('')
  return `<form action=/logout method=post>
    <button>logout</button>
  </form><hr>
  <ul>${links}</ul>`
}

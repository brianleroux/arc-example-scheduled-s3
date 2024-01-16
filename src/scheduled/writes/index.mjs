import data from '@architect/shared/data.mjs'

export async function handler (event) {
  let date = new Date(Date.now()).toISOString().substr(0, 10)
  let json = await data.read({ path: `data/${date}.json` })
  await data.write({
    path: `reports/${date}.html`, 
    data: `<a href=/>home</a><hr><pre>${json}</pre>`
  })
}

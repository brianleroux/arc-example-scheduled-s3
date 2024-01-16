import data from '@architect/shared/data.mjs'

// reads data and writes privatebucket/data/yyyy-mm-dd.json
export async function handler () {
  let mock = JSON.stringify({some: 'value', one: 1, bool: true})
  let date = new Date(Date.now()).toISOString().substr(0, 10)
  let path = `data/${date}.json`
  await data.write({ path, data: mock })
}

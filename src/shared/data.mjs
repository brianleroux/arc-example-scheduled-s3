import arc from '@architect/functions'
import awsLite from '@aws-lite/client'
import s3 from '@aws-lite/s3'// eslint-disable-line no-unused-vars

export default {

  // writes arbitrary data to bucket/data/yyyy-mm-dd.json
  async write ({ path, data }) {
    let services = await arc.services()
    let Bucket = services.private.bucket // defined in plugin
    let aws = await awsLite()
    await aws.s3.PutObject({ Bucket, Key: path, Body: data })
  },

  // read key
  async read ({ path }) {
    let services = await arc.services()
    let Bucket = services.private.bucket // defined in plugin
    let aws = await awsLite()
    let res = await aws.s3.GetObject({ Bucket, Key: path })
    console.log(res)
    return res.Body.toString()
  },

  // list keys
  async list ({ prefix }) {
    let services = await arc.services()
    let Bucket = services.private.bucket // defined in plugin
    let aws = await awsLite()
    let res = await aws.s3.ListObjectsV2({ Bucket, Prefix: prefix })
    return res.KeyCount > 0 ? res.Contents.map(k => k.Key) : []
  }
}

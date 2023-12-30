import { S3Client, ListBucketsCommand, ListObjectsCommand } from '@aws-sdk/client-s3'

const client = new S3Client({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: '',
    secretAccessKey: '',
  },
})
// {
//   const command = new ListBucketsCommand({})
//   // {
//   // Bucket: 'saintkim12.resource',
//   // Key: `uploader/${file.name}`,
//   // Body: file,
//   // }
//   client
//     .send(command)
//     .then((data) => {
//       console.log('data', data)
//     })
//     .catch((e) => {
//       console.error(e)
//     })
// }
{
  const command = new ListObjectsCommand({
    Bucket: 'saintkim12.resource',
    // Key: `uploader/${file.name}`,
    // Body: file,
  })
  client
    .send(command)
    .then((data) => {
      console.log('data', data)
    })
    .catch((e) => {
      console.error(e)
    })
}

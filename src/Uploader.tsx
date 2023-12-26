import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { useState, useRef, useCallback, ChangeEvent } from 'react'

export default function Uploader() {
  const input = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<File[]>([])
  const updateFiles = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      console.log('event', event)
      const arg = event.target.files
      let selectedFiles: File[]
      if (!arg) selectedFiles = [] as File[]
      else selectedFiles = [...arg]
      if (!selectedFiles.length) {
        // canceled
      } else {
        setFiles(selectedFiles)
      }
    },
    [files]
  )
  const uploadFiles = useCallback(() => {
    if (!files.length) return
    const file = files[0]
    const client = new S3Client({ region: 'ap-northeast-2', credentials: { accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID, secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY } })
    const command = new PutObjectCommand({
      Bucket: 'saintkim12.resource',
      Key: `uploader/${file.name}`,
      Body: file,
    })

    client
      .send(command)
      .then((data) => {
        console.log('data', data)
      })
      .catch((e) => {
        console.error(e)
      })
  }, [files])
  return (
    <div>
      <button onClick={() => input.current!.click()}>Select Files</button>
      <button onClick={() => setFiles([])}>Clear Files</button>
      <button onClick={uploadFiles}>Upload Files</button>
      <br />
      File: {files.map(({ name }) => name).join(', ')}
      <input type='file' ref={input} onChange={(e) => updateFiles(e)} multiple style={{ width: 0, height: 0, display: 'none' }} />
    </div>
  )
}

import { ListObjectsCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { useState, useRef, useCallback, ChangeEvent, useEffect } from 'react'
import styled from 'styled-components'
import { getSupabase } from './database'
const Wrapper = styled.div`
  width: 100%;
`
const Filezone = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 3px dotted #bbb;
  border-radius: 10px;
  width: 100%;
  height: 200px;
  color: #888;
  font-size: 2rem;
  cursor: pointer;
`
let client: S3Client | null = null
export default function Uploader() {
  const USER_ID = 'TESTUSER' // @FIXME
  const input = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<File[]>([])
  const [filezoneMessage, setFilezoneMessage] = useState<string | null>(null)
  const getCredentials = async () => {
    const KEY = '@saintkim12/tools/credentials'
    let credentials: Record<string, any> | null = ((str) => {
      try {
        return str ? JSON.parse(str) : null
      } catch {
        return null
      }
    })(localStorage.getItem(KEY))
    if (!credentials || !credentials?.accessKeyId || !credentials?.secretAccessKey) {
      const configs = await getSupabase()
        .from('configs')
        .select('data')
        .eq('id', 1)
        .then(({ data }) => data?.[0]?.data)
      console.log('configs loaded')
      if (configs) {
        credentials = {
          accessKeyId: configs.AWS_ACCESS_KEY_ID,
          secretAccessKey: configs.AWS_SECRET_ACCESS_KEY,
        }
        localStorage.setItem(KEY, JSON.stringify(credentials))
        console.log('configs set')
      }
    }
    return credentials
  }
  const getClient = async () => {
    if (client) return client
    else {
      const credentials = await getCredentials()
      return new S3Client({
        region: 'ap-northeast-2',
        credentials: {
          accessKeyId: credentials?.accessKeyId,
          secretAccessKey: credentials?.secretAccessKey,
        },
      })
    }
  }
  const getMyFiles = async () => {
    const client = await getClient()

    const command = new ListObjectsCommand({
      Bucket: 'saintkim12.resource',
      Prefix: `uploader/`,
    })

    return client
      .send(command)
      .then((data) => {
        // console.log('data', data)
        const files = data.Contents ?? []
        return files
      })
      .catch((e) => {
        console.error(e)
        return []
      })
  }
  const updateFiles = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      // console.log('event', event)
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
  const uploadFiles = useCallback(async () => {
    if (!files.length) return
    const file = files[0]
    const client = await getClient()
    const command = new PutObjectCommand({
      Bucket: 'saintkim12.resource',
      Key: `uploader/${USER_ID}/${file.name}`,
      Body: file,
    })

    setFilezoneMessage('Uploading...')
    client
      .send(command)
      .then((data) => {
        console.log('data', data)
        setFilezoneMessage('Uploaded!')
        setFiles([])
      })
      .catch((e) => {
        console.error(e)
        setFilezoneMessage(e.message)
      })
      .finally(() => {
        window.setTimeout(() => {
          setFilezoneMessage(null)
        }, 3000)
      })
  }, [files, filezoneMessage])

  useEffect(() => {
    getMyFiles().then((files) => {
      console.log('files', files)
    })
  }, [])
  return (
    <>
      <Wrapper>
        <Filezone onClick={() => input.current!.click()}>{filezoneMessage ?? 'Click Here!'}</Filezone>
        <div>
          <input type='file' ref={input} onChange={(e) => updateFiles(e)} multiple style={{ width: 0, height: 0, display: 'none' }} />
          {files.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <span>{files.length} 개의 파일&nbsp;</span>
              <a
                href='#'
                onClick={(e) => {
                  e.preventDefault()
                  uploadFiles()
                }}
              >
                업로드
              </a>
            </div>
          )}
        </div>
      </Wrapper>
      {/* <div> */}
      {/* <button onClick={() => input.current!.click()}>Select Files</button> */}
      {/* <button onClick={() => setFiles([])}>Clear Files</button> */}
      {/* <button onClick={uploadFiles}>Upload Files</button> */}
      {/* <br /> */}
      {/* File: {files.map(({ name }) => name).join(', ')} */}
      {/* <input type="file" ref={input} onChange={(e) => updateFiles(e)} multiple style={{ width: 0, height: 0, display: 'none' }} /> */}
      {/* </div> */}
    </>
  )
}

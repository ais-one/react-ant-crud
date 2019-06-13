import React, { useState } from 'react'

import { Upload, Button, Icon, message } from 'antd'
// import reqwest from 'reqwest'

const Demo = () => {

  const [ fileList, setFileList ] = useState([])
  const [ uploading, setUploading ] = useState(false)

  const handleUpload = async () => {
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('files[]', file);
    });

    setUploading(true)

    // You can use any AJAX library you like
    //   reqwest({
    //     url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    //     method: 'post',
    //     processData: false,
    //     data: formData,
    //     success: () => {
    //       setFileList([])
    //       setUploading(false)
    //       message.success('upload successfully.');
    //     },
    //     error: () => {
    //       setUploading(false)
    //       message.error('upload failed.');
    //     },
    //   });
    // };
    const url = 'https://www.mocky.io/v2/5cc8019d300000980a055e76'
    try {
      const rv = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        // mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        // credentials: 'same-origin', // include, *same-origin, omit
        // headers: {
        // 'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
        // },
        // redirect: 'follow', // manual, *follow, error
        // referrer: 'no-referrer', // no-referrer, *client
        // body: JSON.stringify(data), // body data type must match "Content-Type" header
        body: formData
      })
      // const myjson = await rv.json()
      // console.log(myjson)
      setFileList([])
      setUploading(false)
      message.success('upload success.')
    } catch (e) {
      setUploading(false)
      message.error('upload failed.')
    }
  }

  const props = {
    onRemove: file => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1)
      setFileList(newFileList)
    },
    beforeUpload: file => {
      setFileList([...fileList, file])
      return false;
    },
    fileList
  }

  return (
    <div>
      <Upload {...props}>
        <Button>
          <Icon type="upload" /> Select File
        </Button>
      </Upload>
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={fileList.length === 0}
        loading={uploading}
        style={{ marginTop: 16 }}
      >
        {uploading ? 'Uploading' : 'Start Upload'}
      </Button>
    </div>
  )
}

export default Demo

import moment from 'moment'
import React, { useState, useEffect } from 'react'
import { Spin, Form, Input, InputNumber, Switch, Button, Radio, Select, DatePicker, TimePicker, Upload, Icon, message } from 'antd' // Popconfirm, Icon

const { Option } = Select
const { TextArea } = Input

const FileUpload = () => {

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
      await fetch(url, {
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


function ReactAndCrudForm(props) {
  // props:
  // mode, setMode, formFields, formData, loading, handleFormSubmit, formType, updateFieldValue
  const [formItem, setFormItem] = useState({})

  useEffect(() => {
    const { formFields, formData } = props
    const _formFields = formFields.map(item => ({
      ...item,
      value: formData ? formData[item.name] : item.value,
      hidden: (item.hidden && item.hidden === 'add' && !formData) || (item.hidden && item.hidden === 'edit' && formData) || (item.hidden && item.hidden === 'all'),
      readonly: (item.readonly && item.readonly === 'add' && !formData) || (item.readonly && item.readonly === 'edit' && formData) || (item.readonly && item.readonly === 'all')
    }))
    // console.log(formFields)
    setFormItem(_formFields)
  }, [props.mode]) // props.mode, use props.mode instead of props (too senitive), we pay attention only when mode changes
  
  const changeValue = (name, value) => {
    setFormItem(
      formItem.map(o => {
        if (o.name === name) return { ...o, value}
        return o
      })
    )
    props.updateFieldValue(name, value)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log('submit', props.idName, formItem)
    let id
    let data = { }
    for (let item of formItem) {
      if (item.name === props.idName) {
        id = item.value
      } else {
        data[item.name] = item.value
      }
    }
    props.handleFormSubmit({id, data})
  }

  return (
    <Spin spinning={props.loading}>
      <Form onSubmit={handleSubmit} style={{ padding: 16 }}>
        {!formItem.length ? '' : formItem.map(item => {
          if (item.hidden) {
            return ''
          }
          else if (item.type==='input') return (
            <Form.Item key={item.name} label={item.label} colon={item.colon}>
              <Input
                {...item.props}
                // placeholder={item.label}
                // validateStatus={'error'}
                // help={'Please Enter'}
                disabled={item.readonly}
                value={item.value}
                onChange={(e) => changeValue(item.name, e.target.value)}
              />
            </Form.Item>
          )
          else if (item.type==='textarea') return (
            <Form.Item key={item.name} label={item.label} colon={item.colon}>
              <TextArea
                {...item.props}
                disabled={item.readonly}
                value={item.value}
                onChange={(e) => changeValue(item.name, e.target.value)}
              />
            </Form.Item>
          )
          else if (item.type==='number') return (
            <Form.Item key={item.name} label={item.label} colon={item.colon}>
              <InputNumber
                {...item.props}
                disabled={item.readonly}
                value={item.value}
                onChange={(v) => changeValue(item.name, v)}
              />
            </Form.Item>
          )
          else if (item.type==='switch') return (
            <Form.Item key={item.name} label={item.label} colon={item.colon}>
              <Switch
                {...item.props}
                disabled={item.readonly}
                checked={item.value}
                onChange={(v) => changeValue(item.name, v)}
              /> 
            </Form.Item>              
          )
          else if (item.type==='date') return (
            <Form.Item key={item.name} label={item.label} colon={item.colon}>
              <DatePicker
                {...item.props}
                disabled={item.readonly}
                value={moment(item.value)}
                onChange={(dateString) => changeValue(item.name, dateString)}
              /> 
            </Form.Item>              
          )
          else if (item.type==='time') return (
            <Form.Item key={item.name} label={item.label} colon={item.colon}>
              <TimePicker
                {...item.props}
                disabled={item.readonly}
                value={moment(item.value)}
                onChange={(timeString) => changeValue(item.name, timeString)}
              />
            </Form.Item>              
          )
          else if (item.type==='select') return (
            <Form.Item key={item.name} label={item.label} colon={item.colon}>
              <Select
                {...item.props}
                value={item.value}
                onChange={(a, b) => changeValue(item.name, a)}
              >
                {item.options.map(option => <Option key={option.value} value={option.value}>{option.label}</Option>)}
              </Select>
            </Form.Item>
          )
          else if (item.type==='radio') return (
            <Form.Item key={item.name} label={item.label} colon={item.colon}>
              <Radio.Group
                {...item.props}
                onChange={(e) => console.log(e)}
                value={item.value}
              >
                {item.options.map(option => <Radio key={option.value} value={option.value}>{option.label}</Radio>)}
              </Radio.Group>
            </Form.Item>
          )
          else if (item.type==='upload' && props.formType !== 'filter') return (
            <Form.Item key={item.name} label={item.label} colon={item.colon}>
              <FileUpload />
            </Form.Item>
          )
          else return ''
        })}
        {props.formType !== 'filter' && <Form.Item>
          <Button style={{ marginRight: 8 }} type="primary" htmlType="submit">{props.mode === 'add' ? 'Add' : 'Update'}</Button>
          <Button type="default" htmlType="button" onClick={() => props.setMode('view')}>Cancel</Button>
        </Form.Item>}
      </Form>
    </Spin>
  )
}

export default ReactAndCrudForm

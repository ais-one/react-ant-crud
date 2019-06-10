import moment from 'moment'
import React, { useState, useEffect } from 'react'
import { Spin, Form, Input, InputNumber, Switch, Button, Radio, Select, DatePicker } from 'antd' // Popconfirm, Icon

const { Option } = Select
const { TextArea } = Input

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
  }, [props])
  
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
    // console.log('submit', formItem)
    let id
    let data = { }
    for (let item of formItem) {
      if (item.name === 'id') { // TBD make id configurable
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
            <Form.Item key={item.name} label={item.label}>
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
            <Form.Item key={item.name} label={item.label}>
              <TextArea
                {...item.props}
                disabled={item.readonly}
                value={item.value}
                onChange={(e) => changeValue(item.name, e.target.value)}
              />
            </Form.Item>
          )
          else if (item.type==='number') return (
            <Form.Item key={item.name} label={item.label}>
              <InputNumber
                {...item.props}
                disabled={item.readonly}
                value={item.value}
                onChange={(v) => changeValue(item.name, v)}
              />
            </Form.Item>
          )
          else if (item.type==='switch') return (
            <Form.Item key={item.name} label={item.label}>
              <Switch
                {...item.props}
                disabled={item.readonly}
                checked={item.value}
                onChange={(v) => changeValue(item.name, v)}
              /> 
            </Form.Item>              
          )
          else if (item.type==='date') return (
            <Form.Item key={item.name} label={item.label}>
              <DatePicker
                {...item.props}
                disabled={item.readonly}
                value={moment(item.value)}
                onChange={(dateString) => changeValue(item.name, dateString)}
              /> 
            </Form.Item>              
          )
          else if (item.type==='select') return (
            <Form.Item key={item.name} label={item.label}>
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
            <Form.Item key={item.name} label={item.label}>
              <Radio.Group
                {...item.props}
                onChange={(e) => console.log(e)}
                value={item.value}
              >
                {item.options.map(option => <Radio key={option.value} value={option.value}>{option.label}</Radio>)}
              </Radio.Group>
            </Form.Item>
          )
          else return ''
        })}
        {props.formType !== 'filter' ? <Form.Item>
          <Button style={{ marginRight: 8 }} type="primary" htmlType="submit">{props.mode === 'add' ? 'Add' : 'Update'}</Button>
          <Button type="default" htmlType="button" onClick={() => props.setMode('view')}>Cancel</Button>
        </Form.Item> : ''}
        {/* <Form.Item>
          <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
          />
        </Form.Item> */}
      </Form>
    </Spin>
  )
}

export default ReactAndCrudForm

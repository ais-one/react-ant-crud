import moment from 'moment'
import React, { useState, useEffect } from 'react'
import { Table, Input, Button, Icon, Form, DatePicker } from 'antd' // Popconfirm

import { find, findOne } from './data' // update, insert, remove

import './App.css'

const { TextArea } = Input

function App() {
  const formItems = [
    {
      name: 'id',
      type: 'input',
      value: '',
      hidden: false,
      readonly: false,
      validation: null, // validation function
      props: {
        type: 'text',
        placeholder: 'ID'  
      }
    },
    {
      // label: 'Name',
      // validation: null, // validation function
      name: 'name',
      type: 'input',
      value: '',
      props: {
        type: 'text',
        placeholder: 'Name'  
      }
    },
    {
      label: 'About',
      name: 'about',
      type: 'textarea', // text subtype
      value: '',
      validation: null, // validation function
    },
    {
      label: 'Height',
      name: 'height',
      type: 'number', // text subtype
      value: 0,
      validation: null, // validation function
    },    
    {
      label: 'Birthdate', // date, time, date & time
      name: 'dob',
      type: 'date', // text subtype
      value: new Date(),
      validation: null // validation function
    },
    {
      label: 'Single',
      name: 'single',
      type: 'bool',
      value: false,
      validation: null
    },
    {
      label: 'Sex',
      name: 'sex',
      type: 'select',
      value: 'U', //  single
      validation: null,
      options: [
        { value: 'M', label: 'Male' },
        { value: 'F', label: 'Female' },
        { value: 'U', label: 'Not Specified' }
      ]
    },
    {
      label: 'Friends',
      name: 'friendsId',
      type: 'select',
      value: [], // multiple
      validation: null,
      options: [
        { value: '1', label: 'Friend 1' },
        { value: '2', label: 'Friend 2' },
        { value: '3', label: 'Friend 3' }
      ],
      hidden: true,
      readonly: true
    }

    // drag and drop
    // autocomplete
    // comments fields
  ]

  const getDatas = async (_pagination, _filter, _sort) => {
    // loading state on
    if (!_pagination) _pagination = { ...pagination }
    try {
      const page = _pagination.current
      // const offset = (page -1 ) * _pagination.pageSize
      const {data} = await find({ page, limit: _pagination.pageSize })
      // data = {
      //   results: [],
      //   totals: ?
      // }
      if (data.results) {
        setTableData(data.results)
        setPagination({ ..._pagination, total: data.total })
      } else {
        setTableData([])
        setPagination({ ..._pagination, total: 0 })
      }
    } catch (e) {

    }
    // loading state off
  }

  const [mode, setMode] = useState('view')
  const [tableData, setTableData] = useState([])
  const [formData, setFormData] = useState({})
  const [pagination, setPagination] = useState({ current: 1, pageSize: 2, total: 0, position: 'top' })

  useEffect(() => {
    const doFetch = async () => {
      // try catch
      await getDatas(pagination)
    }
    doFetch()
    // return
  }, []) // only on mount
  

  const getData = async (id) => {
    let obj
    if (id) { // edit
      const {data} = await findOne({ id })
      obj = data
    }
    // if data
    const _formItems = formItems.map(item => ({
      ...item,
      value: id ? obj[item.name] : item.value
      // set readonly
      // set hidden
    }))
    setFormData(_formItems)
  }

  // columns
  const columns = [
    { title: 'ID', dataIndex: 'id' },
    { title: 'Name', dataIndex: 'name', width: '30%' },
    { title: 'Birthdate', dataIndex: 'dob', render: (text, record) => {
      return new Intl.DateTimeFormat('en-GB').format(text)
    }},
    {
      title: 'Action',
      key: 'action',
      render: (record) => <div onClick={(e) => {
        e.stopPropagation()
        // delete record
        console.log('Action Click 2', record, e)
      }}>Delete</div>
    },
  ]

  const addData = async () => {
    console.log('addData')
    await getData()
    setMode('add')
  }

  const editData = async (id) => {
    console.log('editData')
    await getData(id)
    setMode('edit')
  }

  const changeValue = (name, value) => {
    setFormData(
      formData.map(o => {
        if (o.name === name) return { ...o, value}
        return o
      })
    )
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('submit', formData)
    setMode('view')
  }

  return (
    <div className="App">
      {mode === 'view' ?
      <>
        <Button onClick={addData} type="primary" style={{ margin: 4 }}>
          Add a row
        </Button>
        <Table
          style={{ margin: 4 }}
          // locale={{ emptyText: <Empty image={'asd'} description="" /> }}
          // components={components}
          // rowClassName={() => 'editable-row'}
          rowKey="id"
          bordered
          loading={false}
          dataSource={tableData}
          columns={columns}
          onRow={(record, rowIndex) => {
            return {
              onClick: event => {
                console.log('row click', record, rowIndex)
                editData(record.id)
              }, // click row
              onDoubleClick: event => {}, // double click row
              onContextMenu: event => {}, // right button click row
              onMouseEnter: event => {}, // mouse enter row
              onMouseLeave: event => {}, // mouse leave row
            }
          }}
          onHeaderRow={column => {
            return {
              onClick: () => {}, // click header row
            }
          }}
        />
      </>
      :
      <div>
        <Form onSubmit={handleSubmit} style={{ padding: 16 }}>
          {formData.map(item => {
            if (item.hidden) {
              return ''
            }
            else if (item.type==='input') return (
              <Form.Item key={item.name}>
                <Input
                  {...item.props}
                  // placeholder={item.label}
                  // validateStatus={'error'}
                  // help={'Please Enter'}
                  value={item.value}
                  onChange={(e) => changeValue(item.name, e.target.value)}
                />
              </Form.Item>
            )
            else if (item.type==='textarea') return (
              <Form.Item key={item.name}>
                <TextArea
                  disabled={item.readonly}
                  placeholder={item.label}
                  value={item.value}
                  onChange={(e) => changeValue(item.name, e.target.value)}
                />
              </Form.Item>
            )
            else if (item.type==='date') return (
              <Form.Item key={item.name}>
                <DatePicker
                  disabled={item.readonly}
                  placeholder={item.label}
                  value={moment(item.value)}
                  onChange={(dateString) => changeValue(item.name, dateString)}
                /> 
              </Form.Item>              
            )
            else return ''
          })}
          <Form.Item>
            <Button styletype="primary" htmlType="submit">{mode === 'add' ? 'Add' : 'Update'}</Button>
            <Button type="default" htmlType="button" onClick={() => setMode('view')}>Cancel</Button>
          </Form.Item>
          {/* <Form.Item>
            <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
            />
          </Form.Item> */}
        </Form>
      </div>
      }
    </div>
  )
}

export default App

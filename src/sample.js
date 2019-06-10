let data = []

for (let i=1; i<=50; i++) {
  data.push({
    id: i,
    name: 'Name ' + i,
    about: 'A very long description of the person',
    height: 172,
    dob: new Date(),
    active: true,
    sex: 'M', // M = Male, F = Female, U = Not Disclosed
    friendsId: []
  })
}

const find = ({ page, limit }) => {
  // console.log(page)
  const offset = (page - 1) * limit
  let results = []
  for (let i=offset; i<(offset + limit); i++) {
    if (i < data.length)
      results.push(data[i])
    else
      break
  }
  return { data: { results, totals: data.length } }
}

const findOne = ({ id }) => {
  const rv = data.find(item => item.id === id)
  if (!rv) return { data: {} }
  else return { data: rv }
}

const update = ({ id, _data }) => {
  const idx = data.findIndex(item => item.id === id)
  // console.log('yuu', id, idx, data[idx])
  if (idx !== -1) {
    data[idx] = { id, ..._data }
  }
}

const remove = ({ id }) => {
  const idx = data.findIndex(item => item.id === id)
  if (idx !== -1) {
    data.splice(idx, 1);
  }
}

const insert = ({ _data }) => {
  let id = 1
  if (data.length) {
    id = data[data.length - 1].id + 1
  }
  data.push({
    ..._data,
    id
  })
}

const formFieldsFilter = [
  {
    name: 'startDate',
    type: 'input',
    value: '2020-01-01',
    props: {
      type: 'text',
      placeholder: 'Start Date'
    }
  },
  {
    name: 'endDate',
    type: 'input',
    value: '2020-12-31',
    props: {
      type: 'text',
      placeholder: 'End Date'
    }
  }
]

const formFieldsCrud = [
  {
    name: 'id',
    type: 'input',
    value: '',
    hidden: 'add',
    readonly: 'all',
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
    name: 'about',
    type: 'textarea', // text subtype
    value: '',
    validation: null, // validation function
    props: {
      placeholder: 'About'  
    }
  },
  {
    name: 'height',
    type: 'number', // text subtype
    value: 0,
    validation: null, // validation function
    props: {
      placeholder: 'Height'  
    }
  },    
  {
    name: 'dob',
    type: 'date', // text subtype
    value: new Date(),
    validation: null, // validation function
    props: {
      placeholder: 'Birthdate'  
    }
  },
  {
    label: 'Active',
    name: 'active',
    type: 'switch',
    value: false,
    validation: null,
    props: {
      placeholder: 'Active'  
    }
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
    ],
    props: {
      placeholder: 'Sex',
      mode: 'default'
    }
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
    props: {
      placeholder: 'Friends',
      mode: 'multiple'
    },
    // hidden: 'all',
    // readonly: 'all'
  }
  // drag and drop
  // autocomplete
  // comments fields
]

const tableColumns = [
  { title: 'ID', dataIndex: 'id' },
  { title: 'Name', dataIndex: 'name', width: '30%', sorter: true },
  { title: 'Birthdate', dataIndex: 'dob', sorter: true, render: (text, record) => {
    return new Intl.DateTimeFormat('en-GB').format(text)
  }}
]

const title = 'CRUD Sample'

export {
  title,
  find,
  findOne,
  update,
  insert,
  remove,
  tableColumns,
  formFieldsFilter,
  formFieldsCrud
}

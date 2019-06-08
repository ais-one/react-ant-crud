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
    id,
    ...data
  })
}

export {
  find,
  findOne,
  update,
  insert,
  remove
}

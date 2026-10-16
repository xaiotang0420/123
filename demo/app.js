// app.js - 用最小模拟数据实现交互
const state = {
  students: [
    {id:'2023001', name:'张三'},
    {id:'2023002', name:'李四'}
  ],
  courses: [
    {code:'CS101', name:'计算机导论'},
    {code:'MA101', name:'高等数学'}
  ],
  schedule: [
    {day:'周一', time:'09:00-10:30', course:'CS101'},
    {day:'周三', time:'10:40-12:10', course:'MA101'}
  ]
}

// helpers
const $ = sel => document.querySelector(sel)
const renderCounts = () => {
  $('#count-students').textContent = state.students.length
  $('#count-courses').textContent = state.courses.length
}

const renderStudents = (filter='') => {
  const tbody = $('#students-table tbody')
  tbody.innerHTML = ''
  state.students
    .filter(s => (s.name + s.id).includes(filter))
    .forEach(s => {
      const tr = document.createElement('tr')
      tr.innerHTML = `<td>${s.id}</td><td>${s.name}</td><td><button data-id="${s.id}" class="del-stud">删除</button></td>`
      tbody.appendChild(tr)
    })
}

const renderCourses = () => {
  const tbody = $('#courses-table tbody')
  tbody.innerHTML = ''
  state.courses.forEach(c => {
    const tr = document.createElement('tr')
    tr.innerHTML = `<td>${c.code}</td><td>${c.name}</td><td><button data-code="${c.code}" class="del-course">删除</button></td>`
    tbody.appendChild(tr)
  })
}

const renderSchedule = () => {
  const el = $('#schedule-list')
  el.innerHTML = state.schedule.map(s=>`<div class="card">${s.day} ${s.time} — ${s.course}</div>`).join('')
}

// events
document.addEventListener('click', e=>{
  if(e.target.matches('.del-stud')){
    const id = e.target.dataset.id
    state.students = state.students.filter(s=>s.id!==id)
    renderStudents($('#student-search').value)
    renderCounts()
  }
  if(e.target.matches('.del-course')){
    const code = e.target.dataset.code
    state.courses = state.courses.filter(c=>c.code!==code)
    renderCourses()
    renderCounts()
  }
})

$('#add-student-form').addEventListener('submit', e=>{
  e.preventDefault()
  const name = $('#student-name').value.trim()
  const id = $('#student-id').value.trim()
  if(name && id){
    state.students.push({id,name})
    $('#student-name').value=''
    $('#student-id').value=''
    renderStudents($('#student-search').value)
    renderCounts()
  }
})

$('#student-search').addEventListener('input', e=>{
  renderStudents(e.target.value)
})

$('#add-course-form').addEventListener('submit', e=>{
  e.preventDefault()
  const name = $('#course-name').value.trim()
  const code = $('#course-code').value.trim()
  if(name && code){
    state.courses.push({code,name})
    $('#course-name').value=''
    $('#course-code').value=''
    renderCourses()
    renderCounts()
  }
})

// tabs
['dashboard','students','courses','schedule'].forEach(id=>{
  $(`#tab-${id}`).addEventListener('click', ()=>{
    document.querySelectorAll('nav button').forEach(b=>b.classList.remove('active'))
    $(`#tab-${id}`).classList.add('active')
    document.querySelectorAll('.tab-content').forEach(t=>t.classList.add('hidden'))
    $(`#${id}`).classList.remove('hidden')
  })
})

// initial render
renderCounts()
renderStudents()
renderCourses()
renderSchedule()

import express from 'express'
import fs from 'fs'
const app = express()

app.get('/', (req, res) => {
  const people = JSON.parse(fs.readFileSync('./db/people.json', 'utf-8'))

  res.status(200).json(people)
})

app.listen(3000, () => {
  console.log(`http://localhost:3000`)
})

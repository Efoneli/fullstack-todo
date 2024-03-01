
const { exec } = require('child_process')
const { stdout } = require('process')

const serverCommand = 'nodemon index'
const clientCommand = 'npm start'

exec(`concurrently "${serverCommand}" "${clientCommand}"`, (error, stderr) => {
    if (error) {
        console.error(`Error: $(error.message)`)
        return
    }
    if (stderr) {
        console.error(`Error: ${stderr}`)
        return
    }
    console.log(`Success: ${stdout}`)
})
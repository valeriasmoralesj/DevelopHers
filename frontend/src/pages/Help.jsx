import React from 'react'

const Help = () => {
  return (
    <div>
        <h1>Help</h1>
        `<p>Need help? Send us an email and we'll get back to you as soon as possible!</p>

        <form>
            <label for="email">Email:</label>
        <input type="text" id="email" name="email" />

        <label for="issue">What is wrong?</label>
        <input type="text" id="issue" user="issue" />
        <input type="submit" value="Submit" />
        </form>
`
    </div>
  )
}

export default Help
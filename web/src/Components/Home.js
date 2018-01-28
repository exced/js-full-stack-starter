import React from 'react'
import { Steps } from 'antd'

const Step = Steps.Step

const Home = (props) => (
  <Steps current={1} direction='vertical'>
    <Step title="Finished" description="Set up the project, signup and/or signin." />
    <Step title="In Progress" description="Play around with file system. You can upload file by dropping them into a column." />
    <Step title="Waiting" description="Add user stories, tests..." /> 
  </Steps>
)

export default Home
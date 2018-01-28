import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Layout, BackTop } from 'antd'
import Home from '../Components/Home'
import Files from '../Containers/Files'
import Menu from '../Containers/Menu'

const { Content } = Layout

const App = () => (
  <Layout>
    <Menu />
    <BackTop />
    <Layout>
      <Content>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/files" component={Files} />
        </Switch>
      </Content>
    </Layout>
  </Layout>
)

export default App
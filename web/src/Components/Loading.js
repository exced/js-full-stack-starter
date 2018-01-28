import React from 'react'
import PropTypes from 'prop-types'
import { Spin, Icon } from 'antd'
import styled from 'styled-components'

const CustomSpin = () => <Spin indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} />

const StyledSpin = styled(CustomSpin) `
  color: ${props => props.error ? '#ff0000' : '#0099ff'};
`

const LoadingWrapper = styled.div`
  text-align: center;
  margin-bottom: 20px;
  padding: 30px 50px;
  margin: 20px 0;
`

const Loading = ({ error }) => (
  <LoadingWrapper>
    <StyledSpin error={error} />
  </LoadingWrapper>
)

Loading.propTypes = {
  error: PropTypes.bool,
}

Loading.defaultProps = {
  error: false,
}

export default Loading

// HOC
export const WithLoading = Wrapped => ({ loading, error, ...props }) =>
  loading ? <Loading /> : (error ? <Loading error /> : <Wrapped {...props} />)

WithLoading.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
}

WithLoading.defaultProps = {
  loading: false,
  error: false,
}

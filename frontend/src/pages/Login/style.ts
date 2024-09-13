import styled from 'styled-components'

export const Container = styled.div`
  margin: 10px auto;
  width: 95%;
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 1200px) {
    flex-direction: column-reverse;
  }
`

export const ContentFormLogin = styled.div`
  width: 90%;
  max-width: 1400px;
  margin: 10px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 95vh;
`

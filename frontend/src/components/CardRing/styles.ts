import styled from 'styled-components'
import colors from '../../styles/colors'

export const ContainerOptions = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 350px;
`

export const ContainerButtons = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  flex-wrap: wrap;

  .buttonEdit,
  .buttonRemove {
    border: none;
    display: flex;
    padding: 7px 15px;
    align-items: center;
    border-radius: 4px;
    justify-content: center;

    :hover {
      cursor: pointer;
    }
  }

  .buttonEdit {
    background-color: ${colors?.blue};
    color: ${colors?.white};
  }
  .buttonRemove {
    background-color: ${colors?.red};
    color: ${colors?.white};
  }
`

export const ContainerCardRings = styled.div`
  flex: 1;
  width: 100%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 10px;
  border-radius: 4px;
  background-color: ${colors?.backgroundCard};
  border: 2px solid ${colors?.black};
  gap: 15px;
  box-shadow: 0px 0px 5px rgba(0, 1, 1, 0.6);
`

export const ContainerHeaderCard = styled.div`
  width: 95%;
  margin: 10px auto 0;
  padding: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  border: 1px solid ${colors?.black};

  .title {
    color: ${colors?.titleCard};
    font-size: 16px;
    text-decoration: uppercase;
  }
`

export const ContainerStart = styled.div`
  display: flex;
  width: 95%;
  align-items: center;
  gap: 10px;
  justify-content: flex-end;

  .text {
    font-size: 11px;
  }

  .author {
    font-size: 12px;
    font-weight: bold;
  }
`

export const ContainerImage = styled.div`
  width: 95%;
  height: 200px;
  border-radius: 4px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  border: 1px solid ${colors?.black};

  img {
    height: 100%;
    border-radius: 4px;
    object-fit: cover;
    width: 100%;
  }
`

export const ContainerDescription = styled.div`
  width: 95%;
  padding: 7px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 2px solid ${colors?.borderCard};
  background-color: ${colors?.backgroundDescriptionCard};
  min-height: 100px;

  .title {
    font-size: 14px;
    color: ${colors?.black};
  }

  .description {
    font-size: 12px;
  }
`

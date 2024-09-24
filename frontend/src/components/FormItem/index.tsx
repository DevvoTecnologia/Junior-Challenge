import { Form, FormItemProps } from 'antd'
import styled from 'styled-components'

const StyledFormItem = styled(Form.Item)`
  .ant-form-item-label {
    padding: 0px !important;
  }

  label {
    font-size: 14px !important;
    color: #040035 !important;
  }
`

const FormItem: React.FC<FormItemProps> = (props) => {
  return <StyledFormItem {...props} />
}

export default FormItem

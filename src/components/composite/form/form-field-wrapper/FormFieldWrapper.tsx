import React from "react"

interface FormFieldWrapperProps {
  type?: string,
  name: string,
  title: string,
  placeholder?: string,
  className?: string,
  outerClassName?: string,
  value: string,
  onChangeFunc: (value: string, name: string, e: React.ChangeEvent<HTMLInputElement>) => void,
  isReq: boolean,
  reqType?: string,
  errorMsg?: any,
  onValidateFunc?: (value: string, name: string) => void,
  children?:any
}

const FormFieldWrapperDefaultProps: FormFieldWrapperProps = {
  type: 'text',
  name: '',
  title: '',
  placeholder: '',
  className: 'input',
  outerClassName: 'field is-horizontal',
  value: '',
  onChangeFunc: (value: string, name: string, e: React.ChangeEvent<HTMLInputElement>) => { },
  isReq: false,
  reqType: '',
  errorMsg: '',
  onValidateFunc: (value: string, name: string) => { },
  children: null
};

const getRegExp = (type: string) => {
  let regx = null;
  switch (type) {
    case 'EMAIL':
      regx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      break;
    case 'URL':
      regx = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
      break;
    default:
      break;
  }
  return regx;
}

const validationHandler = (e: React.FocusEvent<HTMLInputElement>, props: any) => {
  if (!props.onValidateFunc) return;

  const { value, name } = e.target;
  let msg = null;

  if (!value && props.isReq) {
    msg = `Please enter ${props.title}.`;
  } else if (value && props.reqType && !getRegExp(props.reqType).test(value)) {
    msg = `Please enter valid ${props.title}.`;
  }

  props.onValidateFunc(msg, name);
}

export default (formFieldWrapperProps: FormFieldWrapperProps = FormFieldWrapperDefaultProps) => {

  const props: FormFieldWrapperProps = { ...FormFieldWrapperDefaultProps, ...formFieldWrapperProps }

  const {
    outerClassName,
    title,
    onChangeFunc,
    errorMsg
  } = props;

  return (
    <div className={outerClassName}>
      <div className="field-label is-normal">
        <label className="label">{title}</label>
      </div>
      <div className="field-body">
        <div className="control">
          <div className="field">
            <input
              {...props}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeFunc(e.target.value, e.target.name, e)}
              onBlur={(e: React.FocusEvent<HTMLInputElement>) => validationHandler(e, props)}
            />
          </div>
          {errorMsg && <p className="help is-danger">{errorMsg ? `Please enter ${title}.` : errorMsg}</p>}
        </div>
      </div>
    </div>
  )
}
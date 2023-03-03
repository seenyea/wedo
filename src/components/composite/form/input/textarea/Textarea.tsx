import React from "react"

interface InputFiledProps {
  name: string,
  title: string,
  placeholder?: string,
  className?: string,
  outerClassName?: string,
  value: string,
  onChangeFunc: (value: string, name: string, e: React.ChangeEvent<HTMLTextAreaElement>) => void,
  isReq: boolean,
  reqType?: string,
  errorMsg?: any,
  onValidateFunc?: (value: string, name: string) => void
}

const InputFieldDefaultProps: InputFiledProps = {
  name: '',
  title: '',
  placeholder: '',
  className: 'textarea',
  outerClassName: 'field is-horizontal',
  value: '',
  onChangeFunc: (value: string, name: string, e: React.ChangeEvent<HTMLTextAreaElement>) => { },
  isReq: false,
  reqType: '',
  errorMsg: '',
  onValidateFunc: (value: string, name: string) => { }
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

const validationHandler = (e: React.FocusEvent<HTMLTextAreaElement>, props: any) => {
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

export default (inputFieldProps: InputFiledProps = InputFieldDefaultProps) => {

  const props: InputFiledProps = { ...InputFieldDefaultProps, ...inputFieldProps }

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
        <div className="field">
          <div className="control">
            <textarea  {...props}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChangeFunc(e.target.value, e.target.name, e)}
              onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => validationHandler(e, props)}></textarea>
          </div>
          {errorMsg && <p className="help is-danger">{errorMsg ? `Please enter ${title}.` : errorMsg}</p>}
        </div>
      </div>
    </div>
  )

}
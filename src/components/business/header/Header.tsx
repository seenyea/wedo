import React, { useState, useCallback } from "react"

import NavBar from '@src/components/composite/navbar/NavBar'
import Modal from '@src/components/composite/modal/Modal'
import { updateDataViewItems } from '@src/model/portal/api';
import InputField from '@src/components/composite/form/input/input-filed/InputField';
import Textarea from '@src/components/composite/form/input/textarea/Textarea'

interface HeaderPros {

}

export default (headerPros: HeaderPros) => {
    let [show, setShow] = useState(false);
    const onAddNew = (e: React.MouseEvent) => {
        e.preventDefault();
        setShow(true);
    }

    const onClose = (e: React.MouseEvent) => {
        console.log('onClose')
        e.preventDefault();
        setShow(false)
    }

    const onSure = (e: React.MouseEvent) => {
        e.preventDefault();
        console.log('onSure');
        updateDataViewItems({
            id: '1',
            title:{
                main: `string`,
                subject: `string`
            },
            description: `${form.description}`,
            type: {
                imgSrc: '2',
                content: '3'
            },
            properties: [
                { id: '1', name: '红球一' },
            ]
        })
    }

    const [form, setForm] = useState({
        name: '',
        type: {
            imgSrc: '2',
            content: '3'
        },
        email: '',
        website: '',
        description: ''
    });

    const onInputChange = useCallback((value: string, name: string) => {
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    const onInputValidate = (value: string, fieldName: string) => {

        if(fieldName === 'name'){
            error.name.errorMsg = value;
        }else if(fieldName === 'type'){
            error.type.errorMsg = value;
        }else if(fieldName === 'email'){
            error.email.errorMsg = value;
        }else if(fieldName === 'website'){
            error.website.errorMsg = value;
        }

        setError({
            ...error
        });
    };

    const [error, setError] = useState({
        name: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onInputValidate,
        },
        type: {
            isReq: false,
            errorMsg: '',
            onValidateFunc: onInputValidate,
        },
        email: {
            isReq: true,
            reqType: 'EMAIL',
            errorMsg: '',
            onValidateFunc: onInputValidate,
        },
        website: {
            reqType: 'URL',
            errorMsg: '',
            onValidateFunc: onInputValidate,
        },
        description:{
            isReq: false,
            errorMsg: '',
            onValidateFunc: onInputValidate,
        }
    });

    return <div className="business-header ">
        <NavBar onAddNew={onAddNew} />
        <Modal show={show} onClose={onClose}>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">数据输入框</p>
                    <button className="delete" aria-label="close" onClick={onClose}></button>
                </header>
                <section className="modal-card-body">
                    <InputField name="name"
                        title="数据名称"
                        value={form.name}
                        onChangeFunc={onInputChange}
                        {...error.name} />
                    <InputField name="type"
                        title="数据类型"
                        value={form.type.imgSrc}
                        onChangeFunc={onInputChange}
                        {...error.type} />
                    <Textarea name="description"
                        title="数据描述"
                        value={form.description}
                        onChangeFunc={onInputChange}
                        {...error.description}  />
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-success" onClick={onSure}>确定</button>
                    <button className="button" onClick={onClose}>取消</button>
                </footer>
            </div>
        </Modal>
    </div>
}
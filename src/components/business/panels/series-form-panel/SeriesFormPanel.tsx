import React, { useState } from "react"
import { GroupDashBorderLayout } from '@src/components/basic/layout/common/group-layout/GroupLayout'
import Select from "@src/components/basic/form/select/Select"

import RangeWithNumber from '@src/components/composite/form/range-with-number/RangeWithNumber'

import { fontFamily, fontStyle, fontSize } from '@src/consts/form-constant'
import Color from "@src/components/basic/form/color/Color"

import Toggle from '@src/components/basic/form/toggle/Toggle'


export default () => {
    const [labelDisabled, setLabelDisabled] = useState(false);
    const [shadowDisabled, setShadowDisabled] = useState(false);
    return <div className="series-form-panel">
        <GroupDashBorderLayout>
            <div className="field is-grouped">
                <p className="control is-expanded">
                    提示框
                </p>
                <p className="control">
                    <Toggle />
                </p>
            </div>

            <RangeWithNumber label="描边大小" defaultValue="10" disabled={false} />
            <RangeWithNumber label="虚线线宽" defaultValue="10" disabled={false} />
            <RangeWithNumber label="线段透明度" defaultValue="10" disabled={false} />
            <RangeWithNumber label="填充透明度" defaultValue="10" disabled={false} />

        </GroupDashBorderLayout>
        <GroupDashBorderLayout>
            <div className="field">
                <h5>标签</h5>
            </div>

            <div className="field">
                <div className="control">
                    <label className="checkbox">
                        <input type="checkbox" checked={labelDisabled} onChange={(e: any) => {
                            setLabelDisabled(e.target.checked);
                        }} />
                        启用
                    </label>
                </div>
            </div>

            <div className="field">
                <Select options={fontFamily} />
            </div>

            <div className="field">
                <Select options={fontStyle} />
            </div>

            <div className="field is-grouped">
                <p className="control is-expanded">
                    <Select options={fontSize} />
                </p>
                <p className="control">
                    <Color defaultValue="#000000" disabled={!labelDisabled} />
                </p>
            </div>

        </GroupDashBorderLayout>
        <GroupDashBorderLayout>
            <div className="field">
                <h5>阴影</h5>
            </div>

            <div className="field">
                <div className="control">
                    <label className="checkbox">
                        <input type="checkbox" checked={shadowDisabled} onChange={(e: any) => {
                            setShadowDisabled(e.target.checked);
                        }} />
                        启用
                    </label>
                </div>
            </div>

            <div className="field is-grouped">
                <p className="control is-expanded">
                    颜色
                </p>
                <p className="control">
                    <Color defaultValue="#000000" disabled={!shadowDisabled} />
                </p>
            </div>
            
            <RangeWithNumber label="模糊" defaultValue="10" disabled={!shadowDisabled} />
            <RangeWithNumber label="水平延展" defaultValue="10" disabled={!shadowDisabled} />
            <RangeWithNumber label="垂直延展" defaultValue="10" disabled={!shadowDisabled} />

        </GroupDashBorderLayout>

    </div>
}
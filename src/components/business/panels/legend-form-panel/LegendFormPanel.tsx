import React, { useState } from "react"
import { GroupDashBorderLayout } from '@src/components/basic/layout/common/group-layout/GroupLayout'
import Select from "@src/components/basic/form/select/Select"

import RangeWithNumber from '@src/components/composite/form/range-with-number/RangeWithNumber'

import { fontFamily, fontStyle, fontSize, positions } from '@src/consts/form-constant'
import Color from "@src/components/basic/form/color/Color"

export default () => {
    const [disabled, setDisabled] = useState(false);
    return <div className="chart-form-panel">
        <GroupDashBorderLayout>
            <div className="field">
                <div className="control">
                    <label className="checkbox">
                        <input type="checkbox" checked={disabled} onChange={(e: any) => {
                            setDisabled(e.target.checked);
                        }} />
                        启用
                    </label>
                </div>
            </div>

            <div className="field is-grouped">
                <p className="control is-expanded">
                    位置
                </p>
                <p className="control">
                    <Select options={positions} />
                </p>
            </div>

            <RangeWithNumber label="空间距离" defaultValue="10" disabled={!disabled} />
            <RangeWithNumber label="标记大小" defaultValue="10" disabled={!disabled} />
            <RangeWithNumber label="标记外圈" defaultValue="10" disabled={!disabled} />
            <RangeWithNumber label="元素间距" defaultValue="10" disabled={!disabled} />
            <RangeWithNumber label="水平间距" defaultValue="10" disabled={!disabled} />
            <RangeWithNumber label="竖直间距" defaultValue="10" disabled={!disabled} />

        </GroupDashBorderLayout>
        <GroupDashBorderLayout>
            <div className="field">
                <h5>字体</h5>
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
                    <Color defaultValue="#000000" disabled={!disabled} />
                </p>
            </div>

        </GroupDashBorderLayout>

    </div>
}
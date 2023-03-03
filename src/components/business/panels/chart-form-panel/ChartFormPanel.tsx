import React, { useState } from "react"
import { GroupDashBorderLayout } from '@src/components/basic/layout/common/group-layout/GroupLayout'

import Color from '@src/components/basic/form/color/Color'
import Select from "@src/components/basic/form/select/Select"
import RangeWithNumber from '@src/components/composite/form/range-with-number/RangeWithNumber'

import { fontFamily, fontStyle, fontSize } from '@src/consts/form-constant'

export default () => {
    const [disabled, setDisabled] = useState(false);
    return <div className="chart-form-panel">
        <GroupDashBorderLayout>
            <div className="field">
                <h5>标题</h5>
            </div>
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

            <RangeWithNumber label="上间距" defaultValue="10" disabled={!disabled} />

        </GroupDashBorderLayout>

        <GroupDashBorderLayout>
            <div className="field">
                <h5>间距</h5>
            </div>

            <RangeWithNumber label="上间距" defaultValue="10" disabled={!disabled} />
            <RangeWithNumber label="右间距" defaultValue="0" disabled={!disabled} />
            <RangeWithNumber label="下间距" defaultValue="0" disabled={!disabled} />
            <RangeWithNumber label="左间距" defaultValue="0" disabled={!disabled} />

        </GroupDashBorderLayout>

    </div>
}
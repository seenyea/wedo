import React, { useState } from "react"
import { GroupDashBorderLayout } from '@src/components/basic/layout/common/group-layout/GroupLayout'
import Select from "@src/components/basic/form/select/Select"

import RangeWithNumber from '@src/components/composite/form/range-with-number/RangeWithNumber'

import { fontFamily, fontStyle, fontSize } from '@src/consts/form-constant'
import Color from "@src/components/basic/form/color/Color"



export default () => {
    const [disabled, setDisabled] = useState(false);
    return <div className="series-form-panel">
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

            <RangeWithNumber label="游标高度" defaultValue="10" disabled={!disabled} />

        </GroupDashBorderLayout>

    </div>
}
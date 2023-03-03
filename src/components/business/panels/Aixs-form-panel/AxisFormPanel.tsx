import React, { useState } from "react"
import { GroupDashBorderLayout } from '@src/components/basic/layout/common/group-layout/GroupLayout'
import Select from "@src/components/basic/form/select/Select"

import RangeWithNumber from '@src/components/composite/form/range-with-number/RangeWithNumber'

import { fontFamily, fontStyle, fontSize } from '@src/consts/form-constant'
import Color from "@src/components/basic/form/color/Color"



export default () => {
    return <div className="series-form-panel">
        <GroupDashBorderLayout>
            <div className="field is-grouped">
                <p className="control is-expanded">
                    颜色
                </p>
                <p className="control">
                    <Color defaultValue="#000000" disabled={false} />
                </p>
            </div>

            <RangeWithNumber label="坐标轴轴高度" defaultValue="10" disabled={false} />

        </GroupDashBorderLayout>
        <GroupDashBorderLayout>
            <div className="field">
                <h5>坐标轴轴间隔刻度</h5>
            </div>

            <div className="field is-grouped">
                <p className="control is-expanded">
                    颜色
                </p>
                <p className="control">
                    <Color defaultValue="#000000" disabled={false} />
                </p>
            </div>

            <RangeWithNumber label="刻度宽" defaultValue="1" disabled={false} />
            <RangeWithNumber label="刻度高" defaultValue="1" disabled={false} />
        </GroupDashBorderLayout>
        <GroupDashBorderLayout>
            <div className="field">
                <h5>标签</h5>
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
                    <Color defaultValue="#000000" disabled={false} />
                </p>
            </div>

            <RangeWithNumber label="文字X轴的旋转角度" defaultValue="1" disabled={false} />
            <RangeWithNumber label="文字Y轴的旋转角度" defaultValue="1" disabled={false} />            

        </GroupDashBorderLayout>
    </div>
}
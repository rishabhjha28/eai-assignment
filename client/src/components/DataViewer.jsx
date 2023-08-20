import React from 'react'
import SubData from './SubData'

const DataViewer = ({ data }) => {
    return (
        <div>
            <div className={`font-extrabold flex ${data.open > data.close?"text-red-500":"text-green-500"}`}>
                <h3 className='mr-5'>{data.symbol}</h3>
                <h3>{data.date}</h3>
            </div>
            <div>
                <SubData name={'OPEN'} value={data.open} />
                <SubData name={'HIGH'} value={data.high} />
                <SubData name={'LOW'} value={data.low} />
                <SubData name={'CLOSE'} value={data.close} />
                <SubData name={'VOLUME'} value={data.volume} />
            </div>
        </div>
    )
}

export default DataViewer
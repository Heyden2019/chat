import { Layout } from 'antd';
import React, { FC } from 'react'

type PropsType = {
    className?: string
}

const { Content } = Layout;

const ContentWrapper: FC<PropsType> = ({className = "", children}) => {
    return (
        <Content style={{padding: "20px"}} className={className}>
            {children}
        </Content>
    )
}

export default ContentWrapper

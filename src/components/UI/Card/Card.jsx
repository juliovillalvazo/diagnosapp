import React from 'react';
import { Card } from 'antd';
const { Meta } = Card;
const App = ({ title, description, imgSrc }) => (
    <Card
        style={{
            width: 200,
        }}
        cover={<img alt='card' src={imgSrc} />}
    >
        <Meta title={title} description={description} />
    </Card>
);
export default App;

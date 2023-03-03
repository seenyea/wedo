import React from 'react';
import { Container, Section, Bar } from '@src/components/basic/layout/simple-resizer';

export default () => (
  <Container style={{ height: '100%' }}>
    <Section style={{ background: '#d3d3d3' }} minSize={100} maxSize={300}/>
    <Bar size={10} style={{ background: '#888888', cursor: 'col-resize' }} />
    <Section style={{ background: '#d3d3d3' }} minSize={100} />
  </Container>
);
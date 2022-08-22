import React, { useState } from 'react';
import './App.scss';
import { Block } from './common/Block';
import { Dashboard } from './common/Dashboard';
import './style.css';

export default function App() {
  const [classes, setClasses] = useState({
    head: {
      position: 'absolute',
      padding: '10px',
      top: 0,
      left: 0,
      boxShadow: '0 1px 6px black',
      width: '100%',
      boxSizing: 'border-box',
    },

    head__title: {
      color: 'red',
      fontWeight: 'bold',
    },
  });

  const [selected, setSelected] = useState('root');
  const [dom, setDom] = useState({
    id: 'root',
    tag: 'div',
    attributes: {},
    classes: ['head'],
    childrens: [
      {
        parent: 'root',
        tag: 'div',
        attributes: {},
        id: 'btn1',
        classes: ['btn', 'btn_blue'],
        childrens: ['first btn'],
      },
      {
        parent: 'root',
        tag: 'div',
        attributes: {},
        id: 'btn2',
        classes: ['btn'],
        childrens: ['second btn'],
      },
      {
        parent: 'root',
        tag: 'img',
        attributes: { src: "https://savva-shishak.github.io/img/avatar.jpg" },
        id: 'img',
        classes: ['btn'],
        childrens: [],
      },
    ],
  });

  const dashboard = {
    selected,
    setSelected,
    dom,
    setDom,
    classes,
    setClasses,
  };

  return (
    <div className="app">
      <div className="template">
        <Block
          selected={selected}
          onSelect={setSelected}
          config={dom}
          classes={classes}
        />
      </div>
      {selected && <Dashboard {...dashboard} />}
    </div>
  );
}

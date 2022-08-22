import React, { useState } from 'react';
import './Dashboard.scss';
import { useDashboard } from './useDashboard';
import { Input } from "./ui/input";
import { ObjectEdit } from './ui/object-editor';
import cssProps from "./css-props/css-properties"

export function Dashboard(props) {
  const { active, addClass, selectClass, activeClass, classes } = useDashboard(props);

  const [className, setClassName] = useState("");

  return (
    <div className="dashboard">
      <div> ID: {active.id}</div>
      <div> ID родителя: {active.parent || 'None'}</div>
      <form 
        onSubmit={e => {
          e.preventDefault();
          addClass(className);
          setClassName("");
        }}
        className='dashboard__newclassname'
      >
        Введите название класса, который хотите добавить<br />
        <Input 
          options={classes}
          type="text" 
          id="class-name" 
          value={className} 
          onChange={e => setClassName(e.target.value)} 
          required
          onSelect={value => setClassName(value)}
        />
      </form>
      Классы данного элемента:
      <div className="dashboard__classes">
        {active.classes.map((clazz) => (
          <div 
            className={
              "dashboard__class " + 
              ((activeClass && activeClass.name === clazz) ? "dashboard__class_active" : "")
            } 
            onClick={() => selectClass(clazz)} 
            key={clazz}
          >
            {clazz}
          </div>
        ))}
      </div>
      {activeClass && 
        <ObjectEdit 
          object={activeClass.porps} 
          onChange={obj => activeClass.setProps(obj)} 
          propsOptions={Object.keys(cssProps)}
          valueProps={(props) => []}
        />
      }
    </div>
  );
}

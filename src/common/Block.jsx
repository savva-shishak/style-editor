import React from 'react';

export function Block({ classes, onSelect, config, selected }) {
  const style = config.classes
    .map((clazz) => classes[clazz] || {})
    .reduce((acc, clazz) => ({ ...acc, ...clazz }), {});

  const childs = config.childrens.map((child) =>
    typeof child === 'object' ? (
      <Block
        classes={classes}
        onSelect={onSelect}
        config={child}
        selected={selected}
      />
    ) : (
      child
    ))

  return (
    React.createElement(
      config.tag, { 
        key: config.id,
        ...config.attributes,  
        style: {
          ...style,
          ...(selected === config.id
            ? { outline: '2px solid orange' }
            : {}),
        },
        onClick: (e) => {
          e.stopPropagation();
          onSelect(config.id);
        }
      },
      
      childs.length ? childs : undefined
    )
  );
}

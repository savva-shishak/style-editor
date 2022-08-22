import { useState } from 'react';

const fingById = (id, dom) => {
  if (typeof dom !== 'object') {
    return null;
  }

  if (dom.id === id) {
    return dom;
  }

  for (const child of dom.childrens) {
    const target = fingById(id, child);

    if (target) {
      return target;
    }
  }

  return null;
};

export function useDashboard({
  selected,
  setSelected,
  dom,
  setDom,
  classes,
  setClasses,
}) {
  const [activeClass, setActiveClass] = useState();
  const active = fingById(selected, dom);

  return {
    active,
    selected,
    dom,
    classes: Object.keys(classes).sort((a) =>
      active.classes.includes(a) ? 1 : -1
    ),
    activeClass: activeClass && {
      name: activeClass,
      porps: classes[activeClass],
      setProps(obj) {
        setClasses({
          ...classes, 
          [activeClass]: obj
        });
      },
      setProp(name, value) {
        setClasses({
          ...classes, 
          [activeClass]: {
            ...classes[activeClass], 
            [name]: value
          }
        });
      },
      removeProp(name) {
        const props = classes[activeClass];
        delete props[name];

        setClasses({
          ...classes, 
          [activeClass]: props
        });
      },
    },
    selectClass(clazz) {
      setActiveClass(clazz);
    },
    addClass(clazz) {
      active.classes = Array.from(new Set([clazz, ...active.classes]));
      setDom({...dom});

      if (!classes[clazz]) {
        setClasses({...classes, [clazz]: {}});
      }
    }
  };
}

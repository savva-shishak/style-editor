import { useEffect, useState } from "react";
import { Input } from "./input";
import "./object-editor.css";

export function ObjectEdit({ object, onChange, propsOptions, valueProps }) {
    const [model, setModel] = useState([]);

    useEffect(() => {
        setModel(
            Object
                .keys(object)
                .map(prop => ({ id: Math.random(), prop, value: object[prop] }))
        );
    }, [object, setModel]);

    console.log(propsOptions);

    return <form onSubmit={e => {
        e.preventDefault();
        onChange(model.reduce((acc, { prop, value }) => ({ ...acc, [prop]: value }), {}))
    }} className="object-editor">
        <div className="object-editor__fields">
            {model.map(({ id, prop, value }) => 
                <div key={id} className="object-editor__field">
                    <Input 
                        type="text" 
                        className="object-editor__prop" 
                        value={prop}
                        onChange={({ target: { value: prop } }) => 
                            setModel(
                                model.map(
                                    item => item.id === id ? ({id, prop, value}) : item
                                )
                            )
                        }
                        onSelect={prop => setModel(
                            model.map(
                                item => item.id === id ? ({id, prop, value}) : item
                            )
                        )}
                        options={propsOptions} 
                    />
                    {">"}
                    <Input 
                        type="text" 
                        className="object-editor__value" 
                        value={value}
                        onChange={({ target: { value } }) => 
                            setModel(
                                model.map(
                                    item => item.id === id ? ({id, prop, value}) : item
                                )
                            )
                        }
                        onSelect={value => setModel(
                            model.map(
                                item => item.id === id ? ({id, prop, value}) : item
                            )
                        )}
                        options={valueProps(prop)} 
                    />
                </div>
            )}
        </div>
        <button>Применить</button>
    </form>
}
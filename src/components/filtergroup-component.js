import React from 'react';

export default function FilterGroup(props) {
    return (<div>
        <select value={props.selected1} onChange={props.select1Change}>
            {props.select1.map(options => {
                return <option key={options.key} data-customkey={options.key} value={options.value}>{options.value}</option>
            }
            )}
        </select>
        <select value={props.selected2} onChange={props.select2Change} >
            {props.select2.map(options => {
                return <option key={options} value={options}>{options}</option>
            }
            )}
        </select>
        <select value={props.selected3} onChange={props.select3Change}>
            {props.select3.map(options => {
                return <option key={options} value={options}>{options}</option>;
            })}
        </select>
    </div>);
}

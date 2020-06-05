import React from 'react';

export default function FilterGroup(props) {
    return (<div>
        <select value={props.selected1} onChange={(event) => { props.select1Change(event, props.id) }}>
            <option defaultValue="" disabled>Please Choose</option>
            {props.select1.map(options => {
                return <option key={options.key} value={options.value}>{options.name}</option>
            }
            )}
        </select>
        <select value={props.selected2} onChange={(event) => { props.select2Change(event, props.id) }} >
            <option defaultValue="" disabled>Please Choose</option>
            {props.select2.map(options => {
                return <option key={options} value={options}>{options}</option>
            }
            )}
        </select>
        <select value={props.selected3} onChange={(event) => { props.select3Change(event, props.id) }}>
            <option defaultValue="" disabled>Please Choose</option>
            {props.select3.map(options => {
                return <option key={options} value={options}>{options}</option>;
            })}
        </select>
        <select value={props.logicoperator} onChange={(event) => { props.logicChange(event, props.id) }} >
            <option defaultValue="" disabled>Please Choose</option>
            {props.logic.map(options => {
                return <option key={options} value={options}>{options}</option>;
            })}
        </select>
    </div>);
}

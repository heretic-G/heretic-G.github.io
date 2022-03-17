import { useEffect, useState } from "react";
import { Button } from 'antd';
import _ from 'lodash';
import * as GenerateSchema from '@/utils/toJsonSchema'
import SchemaItem from './schemaItem'

export default function EditJSON (props) {
    let [schema, setSchema] = useState()
    let [json, setJson] = useState()

    useEffect(() => {
        let json = props.value || {}
        if (typeof props.value === 'string') {
            json = JSON.parse(props.value)
        }
        const jsonSchema = GenerateSchema.json('root', json)
        addSequenceParam(jsonSchema)
        setJson(json)
        setSchema(jsonSchema)
    }, [props.value])

    function addSequenceParam (jsonSchema) {
        if (jsonSchema.type === 'object') {
            jsonSchema.sequence = Object.keys(jsonSchema.properties)
            for (let key in jsonSchema.properties) {
                addSequenceParam(jsonSchema.properties[key])
            }
        }
        if (jsonSchema.type === 'array') {
            jsonSchema.sequence = Array(jsonSchema.items.length).fill(1).map((_, index) => index)
            jsonSchema.items.forEach(curr => {
                addSequenceParam(curr)
            })
        }
    }

    function editSequence (jsonSchema, { sequence, label, oldLabel }, curr) {
        optionSequenceItem(jsonSchema, sequence,
            (jsonSchema) => {
                jsonSchema.properties[label] = jsonSchema.properties[oldLabel]
                delete jsonSchema.properties[oldLabel]
                jsonSchema.sequence = curr
            })
    }

    function addSequenceItem (jsonSchema, { position, type, isArray, sequence, label }, curr) {
        optionSequenceItem(jsonSchema, sequence,
            (jsonSchema) => {
                if (position === 'brother' && isArray) {
                    jsonSchema.items.splice(label + 1, 0, {})
                }
                if (position === 'child' && type === 'array') {
                    jsonSchema.items.splice(jsonSchema.items.length, 0, {})
                }
                jsonSchema.sequence = curr
            })
    }

    function copySequenceItem (jsonSchema, { isArray, sequence, label, newLabel }, curr) {
        optionSequenceItem(jsonSchema, sequence,
            (jsonSchema) => {
                if (isArray) {
                    jsonSchema.sequence = curr
                    jsonSchema.items.splice(label, 0, _.cloneDeep(jsonSchema.items[label]))
                } else {
                    jsonSchema.sequence = curr
                    jsonSchema.properties[newLabel] = _.cloneDeep(jsonSchema.properties[label])
                }
            })
    }

    function deleteSequenceItem (jsonSchema, { isArray, sequence, label }, curr) {
        optionSequenceItem(jsonSchema, sequence,
            (jsonSchema) => {
                if (isArray) {
                    jsonSchema.items.splice(label, 1)
                } else {
                    delete jsonSchema.properties[label];
                }
                jsonSchema.sequence = curr
            })
    }

    function optionSequenceItem (jsonSchema, sequence, callback) {
        if (jsonSchema?.sequence === sequence) {
            return callback && callback(jsonSchema)
        }
        if (jsonSchema.type === 'object') {
            for (let key in jsonSchema.properties) {
                optionSequenceItem(jsonSchema.properties[key], sequence, callback)
            }
        }
        if (jsonSchema.type === 'array') {
            jsonSchema.items.forEach(curr => {
                optionSequenceItem(curr, sequence, callback)
            })
        }
    }

    function setVal (type, val) {
        let realVal
        switch (type) {
            case 'boolean':
                realVal = Boolean(val)
                break
            case 'number':
                realVal = Number(val)
                break
            case 'string':
                realVal = String(val)
                break
            case 'object':
                realVal = {}
                break
            case 'array':
                realVal = []
                break
            default:
                realVal = String(val)
                break
        }
        return realVal
    }

    function changeJsonName (armJson, payload, path) {
        let armObj = [...path].slice(0, -1).reduce((prev,next) => {
            return prev[next]
        }, armJson)
        armObj[payload.label] = armObj[payload.oldLabel]
        delete armObj[payload.oldLabel]
        editSequence(schema, payload, [...payload.sequence].map(curr => {
            if (curr === payload.oldLabel) {
                return payload.label
            } else {
                return curr
            }
        }))
        return {
            json: armJson,
            schema: schema
        }
    }

    function changeJsonValue (armJson, payload, path) {
        let armObj = [...path].slice(0, -1).reduce((prev,next) => {
            return prev[next]
        }, armJson)
        armObj[path[path.length - 1]] = setVal(payload.type, payload.value)
        return {
            json: armJson
        }
    }

    function changeJsonType (json, payload, path) {
        let { json: t_JSON } = changeJsonValue(json, payload, path)
        const jsonSchema = GenerateSchema.json('root', t_JSON)
        let t_Schema = _.merge(schema, jsonSchema)
        addSequenceParam(t_Schema)
        return {
            json: t_JSON,
            schema: t_Schema
        }
    }

    function addJsonItem (armJson, payload, path) {
        let objPath
        if (payload.position === 'child') {
            objPath = [...path]
        } else {
            objPath = [...path].slice(0, -1)
        }
        let armName
        let armSequence
        let armObj = objPath.reduce((prev,next) => {
            return prev[next]
        }, armJson)
        if (payload.position === 'child' && payload.type === 'array') {
            armObj.splice(armObj.length, 0, '')
            armSequence = Array(payload.sequence.length + 1).fill(1).map((curr, index) => index)
        } else if (payload.position === 'brother' && payload.isArray) {
            armName = payload.label + 1
            armObj.splice(armName, 0, '')
            armSequence = Array(payload.sequence.length + 1).fill(1).map((curr, index) => index)
        } else {
            const baseName = 'field_'
            for (let index = 1; index < 1000; index ++) {
                let addItem = armObj[`${baseName}${index}`]
                if (addItem === undefined) {
                    armName = `${baseName}${index}`
                    armObj[armName] = payload.newVal
                    break
                }
            }
            armSequence = [...payload.sequence]
            armSequence.splice(payload.sequence.indexOf(payload.label) + 1, 0, armName)
        }
        addSequenceItem(schema, payload, armSequence)
        const jsonSchema = GenerateSchema.json('root', armJson)
        let t_Schema = _.merge(schema, jsonSchema)
        return {
            json: armJson,
            schema: t_Schema
        }
    }

    function changeFun (path, payload) {
        let result
        let jsonData = _.cloneDeep(json)
        switch (payload.action) {
            case 'name':
                result = changeJsonName(jsonData, payload, path)
                break
            case 'value':
                result = changeJsonValue(jsonData, payload, path)
                break
            case 'type':
                result = changeJsonType(jsonData, payload, path)
                break
            case 'addItem':
                result = addJsonItem(jsonData, { ...payload, newVal: '' }, path)
                break
            case 'copyItem':
                result = copyJsonItem(jsonData, { ...payload, newVal: _.cloneDeep(payload.value) }, path)
                break
            case 'deleteItem':
                result = deleteJsonItem(jsonData, payload, path)
                break
            default:
                break
        }
        if (result.json) {
            setJson(result.json)
        }
        if (result.schema) {
            setSchema(result.schema)
        }
    }

    function copyJsonItem (armJson, payload, path) {
        let armName
        let armSequence
        let armObj = [...path].slice(0, -1).reduce((prev,next) => {
            return prev[next]
        }, armJson)

        if (payload.isArray) {
            armName = payload.label + 1
            armObj.splice(payload.label, 0, _.cloneDeep(payload.newVal))
            armSequence = Array(payload.sequence.length).fill(1).map((curr, index) => index)
        } else {
            const baseName = 'field_'
            for (let index = 1; index < 1000; index ++) {
                let addItem = armObj[`${baseName}${index}`]
                if (addItem === undefined) {
                    armName = `${baseName}${index}`
                    armObj[armName] = payload.newVal
                    break
                }
            }
            armSequence = [...payload.sequence]
            armSequence.splice(payload.sequence.indexOf(payload.label) + 1, 0, armName)
        }
        copySequenceItem(schema, { ...payload, newLabel: armName }, armSequence)
        const jsonSchema = GenerateSchema.json('root', armJson)
        let t_Schema = _.merge(schema, jsonSchema)
        return {
            json: armJson,
            schema: t_Schema
        }
    }

    function deleteJsonItem (armJson, payload, path) {
        let armObj = [...path].slice(0, -1).reduce((prev,next) => {
            return prev[next]
        }, armJson);

        let armSequence
        if (payload.isArray) {
            armObj.splice(payload.label, 1)
            armSequence = Array(payload.sequence.length).fill(1).map((_, index) => index)
        } else {
            delete armObj[payload.label];
            armSequence = [...payload.sequence]
            armSequence.splice(payload.sequence.indexOf(payload.label), 1, )
        }

        deleteSequenceItem(schema, payload, armSequence)
        const jsonSchema = GenerateSchema.json('root', armJson)
        let t_Schema = _.merge(schema, jsonSchema)
        return {
            json: armJson,
            schema: t_Schema
        }
    }

    function confirmJson () {
        props.onChange(json)
    }

    return (
        <div className={ 'schema-json_con' }>
            {
                schema &&
                <SchemaItem
                    isRoot={true}
                    path={ [] }
                    changeFun={ changeFun }
                    label={'root'}
                    type={ schema.type }
                    schema={schema} json={json}
                />
            }
            <Button onClick={ confirmJson } >确定</Button>
        </div>
    )
}

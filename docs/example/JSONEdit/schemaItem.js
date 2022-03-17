import {Col, Input, Row, Select, Dropdown, Menu} from "antd";
import {CopyOutlined, DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import { useState, useEffect } from "react";

const { Option } = Select
const typeArr = ['string', 'number', 'array', 'object', 'boolean']

export default function SchemaItem ({ isRoot, type, sequence, schema,
                                      json, arrayObject, label, changeFun, isArray, path }) {
  const menu = (
    <Menu>
      {
        (type === 'object' || type ==='array') &&
        <Menu.Item onClick={ () => addItem('child') }>
          <span>子节点</span>
        </Menu.Item>
      }
      {
        !isRoot &&
        <Menu.Item onClick={ () => addItem('brother') } >
          <span>兄弟节点</span>
        </Menu.Item>
      }
    </Menu>
  )


  function addItem (position) {
    // 添加一个兄弟节点 子节点
    changeFun(path, {
      action: 'addItem',
      position,
      type: type,
      label: label,
      value: json,
      isArray,
      sequence: position === 'child' ? schema.sequence : sequence
    })
  }

  function copyItem () {
    // 克隆当前结构一份
    changeFun(path, {
      action: 'copyItem',
      type: type,
      label: label,
      value: json,
      isArray,
      arrayObject,
      sequence
    })

  }

  function deleteItem () {
    // 删除当前节点
    changeFun(path, {
      action: 'deleteItem',
      type: type,
      label: label,
      value: json,
      isArray,
      sequence
    })
  }

  function handleNameChange (e) {
    const value = e.target.value
    changeFun(path, {
      action: 'name',
      type: type,
      label: value,
      oldLabel: label,
      value: json,
      isArray,
      sequence
    })
  }

  function handleValChange (value) {
    changeFun(path,  {
      action: 'value',
      type: type,
      label,
      isArray,
      value
    })
  }

  function handleTypeChange (value) {
    // setType(e)
    changeFun(path,  {
      action: 'type',
      type: value,
      label,
      isArray,
      value: json
    })
  }

  return (
    <div className={'mar-left-30'} style={{ width: 800 }}>
      {
        schema && type &&
          <>
            <Row gutter={[12, 12]}>
              <Col span={6}>
                <Input
                  disabled={ arrayObject || !type || isRoot || isArray }
                  value={ label }
                  onChange={ handleNameChange }
                  placeholder={'名称'}
                />
              </Col>
              <Col span={6}>
                <Select
                  disabled={ !type || isRoot }
                  value={ type }
                  onChange={ handleTypeChange }
                  placeholder={'类型'}
                  style={{ width: '100%' }}
                >
                  {
                    typeArr.map(curr => {
                      return (<Option key={curr} value={curr}>{ curr }</Option>)
                    })
                  }
                </Select>
              </Col>
              <Col span={6}>
                {
                  type === 'boolean' &&
                    <Select
                      style={{ width: '100%' }}
                      value={ (type === 'array' || type === 'object') ? '' : json }
                      onChange={handleValChange}
                      placeholder={'值'}
                    >
                      <Option value={true}>true</Option>
                      <Option value={false}>false</Option>
                    </Select>
                }
                {
                  type !== 'boolean' &&
                  <Input
                    disabled={ type === 'array' || type === 'object' }
                    value={ (type === 'array' || type === 'object') ? '' : json }
                    onChange={ (e) => handleValChange(e.target.value)}
                    placeholder={'值'}
                    width={120}
                  />
                }
              </Col>
              <Col span={4}>
                <Dropdown overlay={menu}>
                  <PlusOutlined className={'mar-rig-6'}/>
                </Dropdown>

                {
                  (type === 'array' || type === 'object') && !isRoot &&
                  <CopyOutlined className={'mar-rig-6'} onClick={ copyItem }/>
                }
                {
                  !isRoot &&
                  <DeleteOutlined onClick={ deleteItem } />
                }
              </Col>
            </Row>
            {
              type === 'array' && schema.items &&
              schema.items.map((curr, index) => {
                return <SchemaItem label={ index }
                                   isArray={ true }
                                   arrayObject={ curr.type === 'object' }
                                   type={ curr.type }
                                   sequence={ schema.sequence }
                                   path={ [...path, index] }
                                   changeFun={ changeFun }
                                   schema={curr}
                                   json={json[index]}/>
              })
            }
            {
              type === 'object' && schema?.sequence &&
              schema.sequence.map(curr => {
                return <SchemaItem label={ curr }
                                   type={ schema.properties[curr].type }
                                   sequence={ schema.sequence }
                                   path={ [...path, curr] }
                                   changeFun={ changeFun }
                                   schema={schema.properties[curr]}
                                   json={json[curr]}/>
              })
            }
          </>
      }
    </div>
  )
}

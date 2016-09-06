/**
 * Entry
 *
 * @Author: 刘谦 <qianliu>
 * @Date:   2016-09-06 13:12
 * @Email:  112486391@qq.com
 */

// React
import React from 'react'
import { render } from 'react-dom'

// Antd
import { Button } from 'antd'

render(
  <div id="foo">
    <span>Hello, world!</span>
    <Button onClick={e => alert("hi!")}>Click Me</Button>
  </div>,
  document.querySelector('main')
)

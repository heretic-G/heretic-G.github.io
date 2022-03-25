#!/usr/bin/env node
import { Command, Option } from 'commander/esm.mjs';
import fs from 'fs'
import { execFileSync } from 'child_process'
//
// let z = execFileSync('node', ['./zz.mjs'])
// console.log(z.toString())
//
// // fs.writeFile('')
// console.log(process.cwd())
// fs.readdir(process.cwd(), function (err, files) {
//     console.log(files)
// })
// //
// // console.log('start')
// // setTimeout(() => {
// //     console.log('timer1')
// //     Promise.resolve().then(function() {
// //         console.log('promise1')
// //     })
// // }, 0)
// // setTimeout(() => {
// //     console.log('timer2')
// //     Promise.resolve().then(function() {
// //         console.log('promise2')
// //     })
// // }, 0)
// // setImmediate(function immediate () {
// //     console.log('immediate');
// // });
// // Promise.resolve().then(function() {
// //     console.log('promise3')
// // })
// // console.log('end')
//
fs.exists(`${process.cwd()}/z.mjs`, function (exist) {
    fs.writeFile(`${process.cwd()}/z.mjs`, 'console.log(123)你好吗', function (err) {

    })
})

const program = new Command();


program.description('An application for pizza ordering').option('-a, --aaaa <type>', 'zzzzzzzz')
program.option('-b, --no-bbbb', 'zzzzzzzz')
    .addOption(new Option('-d, --drink <size>', 'drink size').choices(['small', 'medium', 'large']));

program.parse()

const options = program.opts();
console.log(options, 123123123)
console.log(JSON.parse(options.aaaa))
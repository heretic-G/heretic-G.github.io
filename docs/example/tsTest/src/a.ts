type z = {
    name: string,
    child?: {
        age: number
        aaa: {
            sss: number
        }
    }
}

let a: z = {
    name: '123'
}

let zzz = a.child?.aaa.sss
// f1()
// f2()
// f3()

function f1(){
    console.log("f1")
}

const f2 = function(){
    console.log("f2")
}

const f3 = () => {
    console.log("f3")
}

x={
    a:1,
    b: ()=>{
        console.log(this)
    }
}

x.b()
// hoisting

f = () => console.log("test arrow")

f5 = (x) => x*10
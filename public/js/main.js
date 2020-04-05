(() => {
    console.log("Ready to begin......");
})()
const submitData = e => {
    const { previousElementSibling: input } = e
    let submit = new XMLHttpRequest()
    submit.open("POST", "/api/InputValue", true)
    submit.setRequestHeader("Content-type", "application/json");
    submit.send(JSON.stringify({ name: input.value}))
    submit.onload =  (d) => {
        const {response} = d.currentTarget
        let upt = document.querySelector(".update")
        response === "true" ? upt.innerHTML = "File created successfuly" : upt.innerHTML = "File already exists" 
        response === "true" ? upt.style.color = "green" : upt.style.color = "red"
        input.value = ""
    }

}
const url = 'https://cjcrdatibhasbwryhwdo.supabase.co'
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqY3JkYXRpYmhhc2J3cnlod2RvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA5NTA4NDEsImV4cCI6MjEwNjUyNjg0MX0.lYcxaR3zgn4NVNcZqq2G5tkq7VJdJmcDTVvYj4WVVc0'
const client = supabase.createClient(url, key)

async function loadTasks() {
    const { data, error } = await client.from("tasks").select("*").order("id")
    if (error) {
        console.log(error)
        return
    }
    const list = document.getElementById("task-list")
    for (const task of data) {
        const li = document.createElement("li")
        li.textContent = task.title + " (" + task.category + ")"
        list.appendChild(li)
        const deleteBtn = document.createElement("button")
        deleteBtn.textContent = "Delete"
        deleteBtn.addEventListener("click", () => deleteTask(task.id))
        li.appendChild(deleteBtn)
        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"
        checkbox.checked = task.is_done
        checkbox.addEventListener("change", () => toggleTask(task.id, checkbox.checked))
        checkbox.addEventListener
        li.prepend(checkbox)
        if (task.is_done) {
            li.style.textDecoration = "line-through"
        }
    }

}
async function addTask() {
    const title =  document.getElementById("task-title").value
    const category = document.getElementById("task-category").value

    if (title === "") {
        return
    }
    const {error} = await client.from("tasks").insert({title, category})
    if (error) {
        console.log(error)
        return
    }
    document.getElementById("task-title").value = ""
    document.getElementById("task-category").value = ""
    document.getElementById("task-list").innerHTML = ""
    loadTasks()
}

async function deleteTask(id) {
    const {error} = await client.from("tasks").delete().eq("id", id)
    if (error) {
        console.log(error)
        return
    }
    document.getElementById("task-list").innerHTML = ""
    loadTasks()

}

async function toggleTask(id, is_done) {
    const {error} = await client.from("tasks").update({is_done}).eq("id", id)
    if (error) {
        console.log(error)
        return
    }
    document.getElementById("task-list").innerHTML = ""
    loadTasks()
}

document.getElementById("add-btn").addEventListener("click", addTask)
addTask
loadTasks()
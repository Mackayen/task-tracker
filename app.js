const url = 'https://cjcrdatibhasbwryhwdo.supabase.co'
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqY3JkYXRpYmhhc2J3cnlod2RvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA5NTA4NDEsImV4cCI6MjEwNjUyNjg0MX0.lYcxaR3zgn4NVNcZqq2G5tkq7VJdJmcDTVvYj4WVVc0'
const client = supabase.createClient(url, key)

async function loadTasks() {
    const { data, error } = await client.from("tasks").select("*")
    if (error) {
        console.log(error)
        return
    }
    const list = document.getElementById("task-list")
    for (const task of data) {
        const li = document.createElement("li")
        li.textContent = task.title
        list.appendChild(li)
    }

}
loadTasks()
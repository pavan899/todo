var url = "https://jsonplaceholder.typicode.com/todos";

async function ListTodos () {
    const res = await fetch(url, {
        method: 'GET'
    });
    const data = await res.json();
    return data;
}

async function DeleteTodo (id) {
    const newUrl = `${url}/${id}`;
    const res = await fetch(newUrl, {
        method: 'DELETE'
    });
    const data = await res.json();
    return data;
}

async function CreateTodo(createData) {
    const { title, userId, completed } = createData;
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            completed: completed,
            userId: userId,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    const data = await res.json();
    return data;
}

async function UpdateTodo(UpdateData) {
    const { title, body, userId, id } = UpdateData;
    const newUrl = `${url}/${id}`;
    const res = await fetch(newUrl, {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            title: title,
            body: body,
            userId: userId,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });
    const data = await res.json();
    return data;
}

export { ListTodos, DeleteTodo, UpdateTodo, CreateTodo }
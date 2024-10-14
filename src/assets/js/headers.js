const customHeaders = {
    'Content-Type': 'application/json',
}

const authHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
}

export { customHeaders, authHeaders }
curl -X POST \
    http://localhost:3035/user/register \
    -H 'cache-control: no-cache' \
    -H 'content-type: application/json' \
    -d '{
        "username": "Eddys99",
        "email": "grama.eddy",
        "password": "passwordTest",
        "password2": "passwordTest"
    }'

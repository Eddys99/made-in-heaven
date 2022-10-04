curl -X POST \
    http://localhost:3035/user/authenticate \
    -H 'cache-control: no-cache' \
    -H 'content-type: application/json' \
    -d '{
        "username": "Eddys99",
        "password": "passwordTest"
    }'

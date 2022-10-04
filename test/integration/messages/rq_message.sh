curl -X POST \
    http://localhost:3035/post-message \
    -H 'cache-control: no-cache' \
    -H 'content-type: application/json' \
    -d '{
        "user_id": "test_id",
        "message": "Hello server"
    }'


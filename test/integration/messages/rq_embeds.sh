curl -X POST \
    http://localhost:3035/post-message \
    -H 'cache-control: no-cache' \
    -H 'content-type: application/json' \
    -d '{
        "user_id": "test_uid",
        "message": "text + embeds",
        "assets": [{
            "title": "car",
            "image": {
                "url": "https://i.imgur.com/cG6STRJ.jpeg"
            }
        }]
    }'


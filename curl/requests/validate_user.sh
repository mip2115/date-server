  curl  \
  --header "Content-Type: application/json" \
  --header "x-auth-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTdkZTk0MzQ3NWJmN2IzMjg3NzcxMCIsImlhdCI6MTU3ODYyMjY1NiwiZXhwIjoxODc4NjIyNjU2fQ.n0SUIsxylB8c6f8AaJ-eNi-SkDQa8PAuSCgCTgn3s1M" \
  --request POST \
  --data-binary @"./validate_user.json" \
  http://localhost:5000/api/user/validate | python -m json.tool


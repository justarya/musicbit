# MusicBit
Your Music Habits

# 


## List of routes
| Route                 | HTTP   | Header(s)   |  Body   | Success               |    Error     |  Description               |
| --------------------- | ------ | ----------- |  -----  | --                    |    ----     |  ----------                 |
| /music/recommendation          | POST   |    none     |   none                        | status(200), return token              |    status(500), return error message                                        | Signing in to Hacktivgit   |
| /music/getArtists           | GET    |    none     |   none                        | status(200), return dataOnly                |    status(500), return error message                                        | Get User Star Repository   |
| /music/getTracks       | GET    |    none     |   none                        | status(200), return dataOnly               |    status(500), return error message                                        | Get Other User Repository              |
| /music/getRecent        | POST   |    none     |   name: string (**required**) | status(201), return dataonly               |    status(500), return error message                                       | Create Repository             |









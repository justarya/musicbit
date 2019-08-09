# MusicBit
Your Music Habits

# 


## List of Music Routes
| Route                 | HTTP   | Header(s)   |  Body   | Success               |    Error     |  Description               |
| --------------------- | ------ | ----------- |  -----  | --                    |    ----     |  ----------                 |
| /music/kanye         | GET   |    none     |   none                        | status(200), return quotes             |    status(500), return error message                                        | Get Kanye Quotes  |
| /music/getArtists           | GET    |    none     |   none                        | status(200), return data               |    status(500), return error message                                        | Get User's Favorite Artist   |
| /music/getTracks       | GET    |    none     |   none                        | status(200), return data              |    status(500), return error message                                        | Get User's Favorite Tracks             |
| /music/getRecent        | GET   |    none     |   none | status(200), return data               |    status(500), return error message                                       | Get User's Recent Tracks             |
| /music/getTime        | GET   |    none     |   none | status(200), return data               |    status(500), return error message                                       | Get User's Total Listening Time            |
| /music/getGenre       | GET   |    none     |   none | status(200), return data               |    status(500), return error message                                       | Get User's Favorite Genre             |
| /music/authorize      | GET   |    none     |   none | status(200), return data               |    status(500), return error message                                       | Get User's Authorization            |
| /music/getGenre       | GET   |    none     |   none | status(200), return data               |    status(500), return error message                                       | Redirect After Authorization           |


## List of User Routes
| Route                 | HTTP   | Header(s)   |  Body   | Success               |    Error     |  Description               |
| --------------------- | ------ | ----------- |  -----  | --                    |    ----     |  ----------                 |
| /user/signin          | POST   |    none     |   none                        | status(200), return token              |    status(500), return error message                                        | Signing in to Musicbit   |








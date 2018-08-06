Feature: Connections
    In order to understand who is connected
    the adminstrator should be able to query Connections
    so that they can group players and start games

    Scenario: Connected Players query
        Given the following players:
        | login       | avatar               | name         |
        |-------------|----------------------|--------------|
        | MoonTahoe   | http://avatar.com/mt | Alex Banks   |
        | eveporcello | http://avatar.com/ep | Eve Porcello |
        | rnally      | http://avatar.com/rn |              |
        | epierce     | http://avatar.com/ed |              |
        When I send the "list" operation:
        ```
        query list {
            playerCount
            allPlayers {
                login
                avatar
                name
            }
        }
        ```
        Then I should recieve the following data:
        ```
        {
            "data": {
                "playerCount": 4,
                "allPlayers": [
                    {
                        "login": "MoonTahoe",
                        "avatar": "http://avatar.com/mt",
                        "name": "Alex Banks"
                    },
                    {
                        "login": "eveporcello",
                        "avatar": "http://avatar.com/ep",
                        "name": "Eve Porcello"
                    },
                    {
                        "login": "rnally",
                        "avatar": "http://avatar.com/rn",
                        "name": null
                    },
                    {
                        "login": "epierce",
                        "avatar": "http://avatar.com/ed",
                        "name": null
                    }
                ]
            }
        }
        ```

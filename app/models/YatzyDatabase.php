<?php
    require_once('..\..\public\_config.php');

    function getConnection() {
        $config = $GLOBALS['dbConfig']; 
        return pg_connect("host={$config['host']} dbname={$config['dbname']} user={$config['user']} password={$config['password']}");
    }

    //Initializes tables and loads the database with dummy info
    function loadDB($connection) {
        if (session_status() == PHP_SESSION_NONE) {
            $query = "CREATE TABLE Users(
                        Username VARCHAR(30) NOT NULL,
                        Password VARCHAR(30),
                        Registration_Date Date,
                        Last_Login DATE,
                        PRIMARY KEY(Username)
                    );";
            pg_query($connection, $query);

            $query = "CREATE TABLE Scores(
                Username VARCHAR(30),
                Score INTEGER,
                Registration_Date Date,
                PRIMARY KEY(Username, Score),
                FOREIGN KEY(Username) REFERENCES Users
            );";
            pg_query($connection, $query);

            $query = "CREATE VIEW Highscores AS
                    SELECT * FROM Scores s1
                    WHERE s1.Score > ALL (
                        SELECT Score FROM Scores s2
                        WHERE s1.Username = s2.Username
                    );";
            pg_query($connection, $query);

            $query = "CREATE VIEW Leaderboard AS
                (SELECT Username, Score, rank() over (order by Score desc) leaderboard_rank
                FROM Highscores);";
            pg_query($connection, $query);
        }
    }

    //Adds user to database
    function registerUser($connection, $username, $password) {
        $query = "INSERT INTO Users(Username, Password, Registration_Date, Last_Login)
                VALUES ($username, $password, CURRENT_DATE, CURRENT_DATE);";
        pg_query($connection, $query);
    }

    //Checks whether the user exists and logs them in
    function logInUser($connection, $username, $password) {
        $query = "SELECT Username, Password FROM Users WHERE
            Username = '$username' AND Password = '$password';";
        $result = pg_query($connection, $query);
        if (pg_num_rows($result) == 0) { //Incorrect username or password
            return false;
        } else {
            $query = "UPDATE Users SET Last_Login = CURRENT_DATE WHERE Username = '$username';";
            pg_query($connection, $query);
            return true;
        }
    }
    
    //Gets all a user's scores
    function getScores($connection, $username) {
        $query = "SELECT Score FROM Scores WHERE
            Username = $username
            ORDER BY Score;";
        $result = pg_query($connection, $query);
        return pg_fetch_all($result);
    }

    //Gets the leaderboard of all players
    function getLeaderboard($connection) {
        $query = "SELECT * FROM Leaderboard;";
        $result = pg_query($connection, $query);
        return pg_fetch_all($result);
    }

?>
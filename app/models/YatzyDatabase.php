<?php
namespace Yatzy\App\Models;
    
class YatzyDatabase {

    private $connection;

    function __construct() {
        $config = $GLOBALS['dbConfig']; 
        $this->connection = pg_connect("host={$config['host']} dbname={$config['dbname']} user={$config['user']} password={$config['password']}");
        $this->load_DB();
    }

    //Initializes tables and loads the database
    function load_DB() {
        
        if (session_status() == PHP_SESSION_NONE) {
            $query = "CREATE TABLE IF NOT EXISTS Users(
                        Username VARCHAR(30) NOT NULL,
                        Password VARCHAR(30),
                        Registration_Date Date,
                        Last_Login DATE,
                        PRIMARY KEY(Username)
                    );";
            pg_query($this->connection, $query);

            $query = "CREATE TABLE IF NOT EXISTS Scores(
                Username VARCHAR(30),
                Score INTEGER,
                Date_Scored Date,
                PRIMARY KEY(Username, Score),
                FOREIGN KEY(Username) REFERENCES Users 
                ON DELETE CASCADE
            );";
            pg_query($this->connection, $query);

            $query = "CREATE VIEW Highscores AS
                    SELECT * FROM Scores s1
                    WHERE s1.Score > ALL (
                        SELECT Score FROM Scores s2
                        WHERE s1.Username = s2.Username
                    );";
            pg_query($this->connection, $query);

            $query = "CREATE VIEW Leaderboard AS
                (SELECT Username, Score, rank() over (order by Score desc) leaderboard_rank
                FROM Highscores);";
            pg_query($this->connection, $query);
        }
    }

    //Adds user to database
    function register_user($username, $password) {
        $query = "INSERT INTO Users(Username, Password, Registration_Date, Last_Login)
                VALUES ('$username', '$password', CURRENT_DATE, CURRENT_DATE);";
        $result = pg_query($this->connection, $query);
        return $result;
    }

    //Checks whether the user exists and logs them in
    function login_user($username, $password) {
        $query = "SELECT Username, Password FROM Users WHERE
            Username = '$username' AND Password = '$password';";
        $result = pg_query($this->connection, $query);
        if (pg_num_rows($result) == 0) { //Incorrect username or password
            return false;
        } else {
            $query = "UPDATE Users SET Last_Login = CURRENT_DATE WHERE Username = '$username';";
            pg_query($this->connection, $query);
            return true;
        }
    }
    
    //Gets all a user's scores
    function get_scores($username) {
        $query = "SELECT Score FROM Scores WHERE 
            Username = '$username' 
            ORDER BY Score;";
        $result = pg_query($this->connection, $query);
        return pg_fetch_all($result);
    }

    //Gets the leaderboard of all players
    function get_leaderboard() {
        $query = "SELECT * FROM Leaderboard LIMIT 10;";
        $result = pg_query($this->connection, $query);
        return pg_fetch_all($result);
    }

    //Gets all users
    function get_users() {
        $query = "SELECT * FROM Users;";
        $result = pg_query($this->connection, $query);
        return pg_fetch_all($result);
    }

    // Fetches user information
    function get_user_info($username) {
        $query = "SELECT Username, Registration_Date, Last_Login FROM Users WHERE Username = '$username';";
        $result = pg_query($this->connection, $query);
        return pg_fetch_assoc($result);
    }

    // Fetches top 10 scores of the user
    function get_top_scores($username) {
        $query = "SELECT Score FROM Scores WHERE Username = '$username' ORDER BY Score DESC LIMIT 10;";
        $result = pg_query($this->connection, $query);
        return pg_fetch_all_columns($result);
    }

    //Deletes a given user from the database
    function delete_user($username) {
        $username = trim($username, "\"'"); //Remove extra quotations
        $query = "DELETE FROM Users WHERE Username = '$username';";
        $result = pg_query($this->connection, $query);
        return $result;
    }

}

?>
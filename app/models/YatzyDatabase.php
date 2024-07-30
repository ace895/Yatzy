<?php
namespace Yatzy\App\Models;
    
class YatzyDatabase {

    private $connection;

    function __construct() {
        $this->connect_to_DB();
        $this->load_DB();
    }

    //Connects to database
    function connect_to_DB() {
        $config = $GLOBALS['dbConfig']; 
        $this->connection = pg_connect("host={$config['host']} dbname={$config['dbname']} user={$config['user']} password={$config['password']}");

        //Create database if it doesn't exist
        if (!$this->connection) {
            $config = $GLOBALS['dbConfig']; 
            $connection = pg_connect("host=localhost port=5432 user={$config['user']} password={$config['password']}");

            $query = "CREATE DATABASE {$config['dbname']};";
            pg_query($connection, $query);
        
            pg_close($connection);
            // Connect to the database
            $this->connection = pg_connect("host={$config['host']} dbname={$config['dbname']} user={$config['user']} password={$config['password']}");
        }
        
    }

    //Initializes database tables if needed
    function load_DB() {
        $query = "CREATE TABLE IF NOT EXISTS Users(
                    First_Name VARCHAR(30) NOT NULL,
                    Last_Name VARCHAR(30) NOT NULL,
                    Username VARCHAR(30) NOT NULL,
                    Password VARCHAR(30),
                    Registration_Date Date,
                    Last_Login DATE,
                    PRIMARY KEY(Username)
                );";
            $result = pg_query($this->connection, $query);

        pg_query($this->connection, 'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
        $query = "CREATE TABLE IF NOT EXISTS Scores(
                    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                    Username VARCHAR(30),
                    Score INTEGER,
                    Date_Scored Date,
                    FOREIGN KEY(Username) REFERENCES Users(Username) 
                    ON DELETE CASCADE
                );";

        pg_query($this->connection, $query);
    }

    //Adds user to database
    function register_user($fName, $lName, $username, $password) {
        $query = "INSERT INTO Users(First_Name, Last_Name, Username, Password, Registration_Date, Last_Login)
                VALUES ('$fName', '$lName', '$username', '$password', CURRENT_DATE, CURRENT_DATE);";
        $result = pg_query($this->connection, $query);
        return $result;
    }

    //Checks whether the user exists and logs them in
    function login_user($username, $password) {
        // Use parameterized queries to prevent SQL injection
        $query = "SELECT Username, Password FROM Users WHERE Username = $1 AND Password = $2;";
        $result = pg_query_params($this->connection, $query, array($username, $password));
    
        if (pg_num_rows($result) == 0) { // Incorrect username or password
            return false;
        } else {
            $query = "UPDATE Users SET Last_Login = CURRENT_DATE WHERE Username = $1;";
            pg_query_params($this->connection, $query, array($username));
            $_SESSION['username'] = $username;
            return true;
        }
    }
    
    //Gets all a user's scores
    function get_scores($username) {
        $username = trim($username, "\"'"); //Remove extra quotations
        $query = "SELECT Score, Date_Scored FROM Scores WHERE 
            Username = '$username' 
            ORDER BY Score;";
        $result = pg_query($this->connection, $query);
        return pg_fetch_all($result);
    }

    //Gets the leaderboard of all players
    function get_leaderboard() {
        $query = "SELECT Username, MAX(Score) AS Score, rank() over (order by MAX(Score) desc) leaderboard_rank
            FROM Scores
            GROUP BY Username
            LIMIT 10;";
        $result = pg_query($this->connection, $query);
        if (!$result) {
            error_log("Failed to get leaderboard: " . pg_last_error($this->connection));
        }
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

    //Adds score to the database
    function add_score($username, $score) {
        $query = "INSERT INTO Scores (Username, Score, Date_Scored) VALUES ($1, $2, CURRENT_DATE);";
        $result = pg_query_params($this->connection, $query, array($username, $score));
        if (!$result) {
            error_log("Failed to add score: " . pg_last_error($this->connection));
            return false;
        }
        return true;
    }

}

?>
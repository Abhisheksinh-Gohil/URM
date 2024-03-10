<?php 
	/**
	* Database Connection
	*/
	class dbconnect {
		private $server = 'localhost:3306';
		private $dbname = 'aag0621_wdm_backend';
		private $user = 'aag0621_abhi';
		private $pass = 'mysql@1018';

		public function connect() {
			try {
				$conn = new PDO('mysql:host=' .$this->server .';dbname=' . $this->dbname, $this->user, $this->pass);
				$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
				return $conn;
			} catch (\Exception $e) {
				echo "Database Error: " . $e->getMessage();
			}
		}
	}

    
 ?>
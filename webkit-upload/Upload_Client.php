<?php

class Upload_Client {

    protected $pdo;
    protected $data;
    protected $modified = false;
    protected $id = false;

    const FILE_STATUS_REMOTE = 0;
    const FILE_STATUS_REQUESTED = 1;
    const FILE_STATUS_IN_TRANSFER = 2;
    const FILE_STATUS_DOWNLOADED = 3;
    const FILE_STATUS_ERROR = 4;

    public function __construct(PDO $pdo) {
        $this->pdo = $pdo;
        $this->data = new stdClass;

    }

    public function generateId() {
        return md5(mt_rand() . uniqid());
    }

    public function load($id) {
        if ($id < 0) {
            return false;
        }

    	$stmt = $this->pdo->prepare("SELECT json FROM clients WHERE id = ?");

    	if (!$stmt) {
            throw new Exception('error with db query');
        }

        $stmt->execute(array($id));
        if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $client_data = json_decode($row['json']);
        }

        if (empty($client_data))
            $client_data = new stdClass();

        $this->data = $client_data;
        $this->modified = false;

        $this->id = $id;
        return true;
    }

    public function hasFile($fileid) {
        $has = !empty($this->data->files) && !empty($this->data->files[$fileid]);
        return $has;
    }

    public function markUploadedFile($fileid, $filename) {
        if (!$this->hasFile($fileid)) {
            return false;
        }
        $this->data->files[$fileid]->local_filename = $filename;
        $this->data->files[$fileid]->status = self::FILE_STATUS_DOWNLOADED;
        $this->updateField('files_downloaded', 'files_downloaded+1');
        $this->markModified();
    }

    public function markErrorInFile($fileid) {
        if (!$this->hasFile($fileid)) {
            return false;
        }
        $this->data->files[$fileid]->status = self::FILE_STATUS_ERROR;
        $this->markModified();
    }

    public function ping() {
        $this->updateField('last_seen', "'" . date('Y-m-d H:i:s') . "'");
    }

    public function getRequestedFiles() {
        $req = array();
        if (empty($this->data->files))
            return $req;

        foreach ($this->data->files as $id => $file) {
            if ($file->status == self::FILE_STATUS_REQUESTED) {
                $req[] = $id;
            }
        }
        return $req;
    }

    public function requestFileForUpload($fileid) {
        if (!$this->hasFile($fileid)) {
            return false;
        }
        if ($this->data->files[$fileid]->status == self::FILE_STATUS_REMOTE) {
            $this->data->files[$fileid]->status = self::FILE_STATUS_REQUESTED;
        }
        $this->markModified();
    }

    public function markFileAsInProgress($fileid) {
        if (!$this->hasFile($fileid)) {
            return false;
        }
        if ($this->data->files[$fileid]->status == self::FILE_STATUS_REQUESTED) {
            $this->data->files[$fileid]->status = self::FILE_STATUS_IN_TRANSFER;
        }
        $this->markModified();
    }

    public function setFiles($files) {
        $this->markModified();
        $this->data->files = $files;
        $this->updateField('files', count($files));
    }

    public function getFiles() {
        return $this->data->files;
    }

    protected function updateField($name, $value) {
        $stmt = $this->pdo->prepare("UPDATE clients SET $name = $value WHERE id = :id");

        return $stmt->execute(array(
            'id' => $this->id,
        ));
    }

    public function markModified() {
        $this->modified = true;
    }

    public function store() {
        if (!$this->modified) {
            return false;
        }

        $stmt = $this->pdo->prepare("UPDATE clients SET json = :json where id = :id");

        if (!$stmt) {
            throw new Exception('error with db query');
        }

        return $stmt->execute(array(
            'json' => json_encode($this->data),
            'id' => $this->id,
        ));
    }

    public function create($user_agent, $ip, $id = null) {
        if (is_null($id)) {
            $id = $this->generateId();
        }

        $stmt = $this->pdo->prepare("INSERT INTO clients (id, created, ip, user_agent, json, files, files_downloaded) VALUES(:id,:created,:ip,:agent,:json,:zero,:zero)");
        $ok = $stmt->execute(array(
        	'created' => date('Y-m-d H:i:s'),
        	'id' => $id,
        	'agent' => $user_agent,
        	'ip' => $ip,
            'json' => '{}',
            'zero' => 0,
        ));
        return $id;
    }

    public function getClients($ip) {
        if ($ip) {
        	$stmt = $this->pdo->prepare("SELECT * FROM clients WHERE ip = :ip
                             ORDER BY last_seen DESC, created DESC");

        	$params = array('ip' => $ip);
        } else {
        	$stmt = $this->pdo->prepare("SELECT * FROM clients
                             ORDER BY last_seen DESC, created DESC");
        	$params = array();
        }

    	if (!$stmt) {
            throw new Exception('error with db query');
        }

        $clients = array();
        $stmt->execute($params);
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            unset($row['json']);
            $clients[$row['id']] = $row;
        }

        return $clients;
    }

}
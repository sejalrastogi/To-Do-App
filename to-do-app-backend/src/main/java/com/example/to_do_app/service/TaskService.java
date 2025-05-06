package com.example.to_do_app.service;

import com.example.to_do_app.entity.Task;
import com.example.to_do_app.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getAll() {
        return taskRepository.findAll();
    }

    public ResponseEntity<?> getById(Long id) {
        Task task = taskRepository.findById(id).orElse(null);
        if(task == null){
            return new ResponseEntity<>("Task Not Found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(task, HttpStatus.OK);
    }

    public ResponseEntity<?> saveEntry(Task task) {
        Task oldTask = taskRepository.findById(task.getId()).orElse(null);
        if(oldTask != null){
            return new ResponseEntity<>("Task already present.", HttpStatus.BAD_REQUEST);
        }
        taskRepository.save(task);
        return new ResponseEntity<>(task, HttpStatus.CREATED);
    }

    public ResponseEntity<?> deleteEntry(Long id) {
        Task oldTask = taskRepository.findById(id).orElse(null);
        if(oldTask == null){
            return new ResponseEntity<>("Task Not Found!", HttpStatus.BAD_REQUEST);
        }
        taskRepository.deleteById(id);
        return new ResponseEntity<>("Successfully Deleted!", HttpStatus.OK);
    }

    public ResponseEntity<?> updateEntry(Long id, String status) {
        Task task = taskRepository.findById(id).orElse(null);
        if(task == null){
            return new ResponseEntity<>("Task Not Found!", HttpStatus.NOT_FOUND);
        }

        task.setStatus(status);
        taskRepository.save(task);

        return new ResponseEntity<>("Status Updated!", HttpStatus.OK);
    }
}

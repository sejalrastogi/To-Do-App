package com.example.to_do_app.controller;

import com.example.to_do_app.entity.Task;
import com.example.to_do_app.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/task")
public class TaskController {

    @Autowired
    private TaskService taskService;


    @GetMapping
    public List<Task> getAll(){
        return taskService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id){
        return taskService.getById(id);
    }

    @PostMapping
    public ResponseEntity<?> createTask(@RequestBody Task task){
        return taskService.saveEntry(task);
    }

    @PutMapping("/{id}/{status}")
    public ResponseEntity<?> updateTask(@PathVariable Long id, @PathVariable String status){
        return taskService.updateEntry(id, status);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id){
        return taskService.deleteEntry(id);
    }


}

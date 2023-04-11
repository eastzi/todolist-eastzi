package com.eastzi.todolist.web.controller.api;

import java.util.List;

import org.apache.ibatis.annotations.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.eastzi.todolist.service.todo.TodoService;
import com.eastzi.todolist.web.dto.CMRespDto;
import com.eastzi.todolist.web.dto.todo.CreateTodoReqDto;
import com.eastzi.todolist.web.dto.todo.TodoListRespDto;
import com.eastzi.todolist.web.dto.todo.UpdateTodoReqDto;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/todolist")
@RequiredArgsConstructor
public class TodoController {
	
	private final TodoService todoService;
	
	@GetMapping("/list/{type}")
	public ResponseEntity<?> getTodoList(@PathVariable String type, @RequestParam int page, @RequestParam int contentCount) {
		List<TodoListRespDto> list = null;
		
		try {
			list = todoService.getTodoList(type, page, contentCount);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body(new CMRespDto<>(-1, page + "page list load failed", list));
		}
		
		return ResponseEntity.ok().body(new CMRespDto<>(1, page + "page list load success", list));
	}
	
	@PostMapping("/todo")
	public ResponseEntity<?> addTodo(@RequestBody CreateTodoReqDto createTodoReqDto) {
		
		try {
			if(!todoService.createTodo(createTodoReqDto)) {
				throw new RuntimeException();
			}
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.internalServerError().body(new CMRespDto<>(-1, "add failed", createTodoReqDto));
		}
		
		return ResponseEntity.ok().body(new CMRespDto<>(1, "add success", createTodoReqDto));
	}
	
	@PutMapping("/complete/todo/{todoCode}")
	public ResponseEntity<?> setComplete(@PathVariable int todoCode) {
		boolean status = false;
		
		try {
			status = todoService.updateTodoComplete(todoCode);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok().body(new CMRespDto<>(-1, "complete failed", status));
		}
		
		return ResponseEntity.ok().body(new CMRespDto<>(1, "complete success", status));
	}
	
	@PutMapping("/importance/todo/{todoCode}")
	public ResponseEntity<?> setImportance(@PathVariable int todoCode) {
		boolean status = false;
		
		try {
			status = todoService.updateTodoImportance(todoCode);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok().body(new CMRespDto<>(-1, "importance failed", status));
		}
		
		return ResponseEntity.ok().body(new CMRespDto<>(1, "importance success", status));
	}
	
	@PutMapping("/todo/{todoCode}")
	public ResponseEntity<?> setTodo(@PathVariable int todoCode, @RequestBody UpdateTodoReqDto updateTodoReqDto) {
		boolean status = false;
		
		try {
			updateTodoReqDto.setTodoCode(todoCode);
			status = todoService.updateTodo(updateTodoReqDto);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok().body(new CMRespDto<>(-1, "update failed", status));
		}
		
		return ResponseEntity.ok().body(new CMRespDto<>(1, "update success", status));
	}
	
	@DeleteMapping("/todo/{todoCode}")
	public ResponseEntity<?> removeTodo(@PathVariable int todoCode) {
		boolean status = false;
		
		try {
			status = todoService.removeTodo(todoCode);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.ok().body(new CMRespDto<>(-1, "delete failed", status));
		}
		
		return ResponseEntity.ok().body(new CMRespDto<>(1, "delete success", status));
	}
}

package com.eastzi.todolist.service.todo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.eastzi.todolist.domain.todo.Todo;
import com.eastzi.todolist.domain.todo.TodoRepository;
import com.eastzi.todolist.web.dto.todo.CreateTodoReqDto;
import com.eastzi.todolist.web.dto.todo.TodoListRespDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService {

	private final TodoRepository todoRepository;
	
	@Override
	public boolean createTodo(CreateTodoReqDto createTodoReqDto) throws Exception {
		System.out.println(createTodoReqDto);
		Todo todoEntity = createTodoReqDto.toEntity();
		
		//게시글 100개 추가
		String content = todoEntity.getTodo_content();
		for(int i = 0; i < 100; i++) {
			todoEntity.setTodo_content(content + "_" + (i + 1));
			if(i % 2 == 0) {
				todoEntity.setImportance_flag(1);
			}else {
				todoEntity.setImportance_flag(0);
			}
			todoRepository.save(todoEntity);
		}
		
		return true;
		
//		return todoRepository.save(todoEntity) > 0;
	}

	@Override
	public List<TodoListRespDto> getTodoList(int page) throws Exception {
		List<TodoListRespDto> todoListRespDtos = new ArrayList<TodoListRespDto>();
		
		todoRepository.getTodoListOfIndex((page - 1) * 20).forEach(todo -> {
			todoListRespDtos.add(todo.toListDto());
		});
		
		return todoListRespDtos;
	}

}

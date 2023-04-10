package com.eastzi.todolist.domain.todo;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TodoRepository {
	public int save(Todo todo) throws Exception;
	public List<Todo> getTodoListOfIndex(Map<String, Object> map) throws Exception;
}

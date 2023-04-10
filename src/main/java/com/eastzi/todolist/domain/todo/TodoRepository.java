package com.eastzi.todolist.domain.todo;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface TodoRepository {
	public int save(Todo todo) throws Exception;
	public List<Todo> getTodoListOfIndex(int index) throws Exception;
}

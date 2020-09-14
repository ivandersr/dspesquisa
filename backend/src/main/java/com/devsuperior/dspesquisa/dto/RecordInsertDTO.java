package com.devsuperior.dspesquisa.dto;

public class RecordInsertDTO {

	public String name;
	public Integer age;
	public Long gameId;
	
	public RecordInsertDTO() {
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer idade) {
		this.age = idade;
	}

	public Long getGameId() {
		return gameId;
	}

	public void setGameId(Long gameId) {
		this.gameId = gameId;
	}
	
	
}

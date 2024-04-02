package task

import (
	"server/model"
	"server/repository/task"
	request "server/request/task"
)

type service struct {
	repository task.Repository
}

func NewService(repository task.Repository) *service {
	return &service{repository}
}

func (s *service) FindAll() ([]model.Task, error) {
	tasks, err := s.repository.FindAll()

	return tasks, err
}

func (s *service) FindByID(ID int) (model.Task, error) {
	task, err := s.repository.FindByID(ID)

	return task, err
}

func (s *service) CreateNew(taskRequest request.CreateTaskRequest) (model.Task, error) {
	// convert yang dari bentukan awalnya sebuah form jadiin ke bentuk model
	task := model.Task{
		Title:    taskRequest.Title,
		Status:   taskRequest.Status,
		Deadline: taskRequest.Deadline,
	}

	newTask, err := s.repository.CreateNew(task)
	return newTask, err
}

func (s *service) Update(ID int, taskRequest request.UpdateTaskRequest) (model.Task, error) {
	task, _ := s.repository.FindByID(ID)

	if taskRequest.Title != "" {
		task.Title = taskRequest.Title
	}
	if taskRequest.Status != "" {
		task.Status = taskRequest.Status
	}
	if taskRequest.Deadline != "" {
		task.Deadline = taskRequest.Deadline
	}

	updatedTask, err := s.repository.Update(task)

	return updatedTask, err
}

func (s *service) Delete(ID int) (model.Task, error) {
	task, _ := s.repository.FindByID(ID)

	deletedTask, err := s.repository.Delete(task)

	return deletedTask, err
}

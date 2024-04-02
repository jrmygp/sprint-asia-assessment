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

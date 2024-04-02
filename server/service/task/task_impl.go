package task

import (
	"server/model"
	"server/repository/task"
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
